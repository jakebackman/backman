/**
 * Resource loader class - this class is responsible for loading
 * all javascript / css resources.
 * 
 * @author Eran Zinman
 */
var ResourceLoader = (function() 
{
    var me = {};
	
	// Content to be written to document
//	var documentWrite = '';

	// current "done" callback function
//	var _cbDone = null;

	/**
	 * Load a given resource file, by document.write into the HTML.
	 * 
	 * @param {string} file - Relative path of the resource URL to include
	 * @param {string} type - ('css', 'js') - The type of resource to load
	 * @author Eran Zinman
	 */
//	function loadResource(file, type)
//	{
//		if (type === 'js')
//		{
//			documentWrite += '<script type="text/javascript" src="' + file + '"></' + 'script>';
//		}
//		else if (type === 'css')
//		{
//			documentWrite += '<link type="text/css" rel="stylesheet" href="' + file + '">';
//		}
//	}

//	/**
//	 * Load a given resource file, by document.write into the HTML.
//	 *
//	 * @param {string} file - Relative path of the resource URL to include
//	 * @param {string} type - ('css', 'js') - The type of resource to load
//	 */
//	function loadResource2(file, type, cbDone)
//	{
//		if (type === 'js')
//		{
//            var cbFail = function(a,b,c){
//                cbDone();
//            };
//            $.getScript(file).done(cbDone).fail(cbFail);
//		}
//		else if (type === 'css')
//		{
//            $.get(file, function(){
//                if (document.createStyleSheet)
//                    document.createStyleSheet(file);
//                else
//                    $('<link rel="stylesheet" type="text/css" href="'+file+'" />').appendTo("head");
//                cbDone();
//            });
////            $.ajax({
////                url: file,
////                dataType: 'css',
////                success: function(){
////                    $('<link rel="stylesheet" type="text/css" href="'+file+'" />').appendTo("head");
////                    cbDone();
////                }
////            });
//		}
//	}

	/**
	 * Load a given resource file, by document.write into the HTML.
	 *
	 * @param {string} file - Relative path of the resource URL to include
	 * @param {string} type - ('css', 'js') - The type of resource to load
	 */
	function loadResource(file, type, cbDone)
	{
		if (type === 'js')
		{
            var script = document.createElement('script'), run = false;
            script.type = 'text/javascript';
            script.src = file;

            script.onload = script.onreadystatechange = function() {
                if (!run && (!this.readyState || this.readyState === 'complete')) {
                    run = true;
                    cbDone && cbDone();
                }
            };
            document.body.appendChild(script);

        }
		else if (type === 'css')
		{
            $.get(file, function(){
                if (document.createStyleSheet)
                    document.createStyleSheet(file);
                else
                    $('<link rel="stylesheet" type="text/css" href="'+file+'" />').appendTo("head");
                cbDone && cbDone();
            });
		}
	}

	/**
	 * Check if criteria is met or not
	 * 
	 * @param {Object} criteriaArray - criteria array to check
	 * @return {Boolean} true if criteria is valid, false otherwise
	 * @author Eran Zinman
	 */
	function isCriteriaMet(criteriaArray)
	{
		// If criteria is empty, we are good
		if (criteriaArray.length == 0)
		{
			return true;
		}
		
		// Loop through "yeah" array, and verify it's valid
		for (var i = 0; i < criteriaArray.length; i++)
		{
			// Get current criteria item
			var item = criteriaArray[i];
			
			// Split into item array
			var itemArray = item.split('&');
			
			// Loop through item array
			var isValid = true;
			for (j = 0; j < itemArray.length; j++)
			{
				// Check if this criteria item equals to one of our platforms or device
				var curCriteria = itemArray[j];
				if ((typeof(platformEnum[curCriteria]) !== 'undefined' && platformEnum[curCriteria] != PLATFORM) ||
					(typeof(deviceTypeEnum[curCriteria]) !== 'undefined' && deviceTypeEnum[curCriteria] != DEVICE))
				{
					// This is valid !
					isValid = false;
				}	
			} 
			
			// If current item is valid, return true and break the main loop
			if (isValid)
			{
				return true;
			}
		}
		
		// We are done, none of the criteria items was valid - criteria is not met
		return false;
	}

	/**
	 * Check if the given resource should be loaded or not (according
	 * to the current device and platform)
	 * 
	 * @param {Object} resource - The resource object, containing an optional "yeah" and "nope" arrays
	 * @return {boolean} true if we should load resource, false otherwise
	 * @author Eran Zinman
	 */
	me.isValidResource = function(resource)
	{	
		// A resource is valid iff is "yeah" parameter is valid (or empty),
		// and his "nope" parameter is not valid
		var isYeah = true;
		var isNope = false;		
			        
		// If resource is valid
		if (resource) 
		{	
			// Get "yeah" and "nope" variables
			var yeahCriteria = resource.yeah || [];
			var nopeCriteria = resource.nope || [];
			
			// Get "yeah" and "nope" crteria's
			isYeah = isCriteriaMet(yeahCriteria);
			
			if (nopeCriteria.length > 0) 
			{
				isNope = isCriteriaMet(nopeCriteria);
			}
		}
	    
	    // Check that both device and platform are OK
		var isValid = isYeah && !isNope;
	    return isValid;
	}
	
	function getResourcesToLoad(resources, packages)
	{
		var resourcesToLoad = [];
		
		// Loop through resources
		var i = null;
		for (i in resources)
		{
			// Get resource and it's type
			var resource = resources[i];

            // check if we need to load this resource package
            if (!packages[resource.packageName])
                continue;

            var resourceType = resource.type;
			
			// Check if we are in DEBUG / RELEASE modes. Try to fetch
			// this state from the parent (if executed from a page)
			var debugMode = false;
			try 
			{
				if (typeof window.DEBUG !== 'undefined') 
				{
					debugMode = window.DEBUG;
				}
				else if (typeof parent.DEBUG !== 'undefined') 
				{
					debugMode = parent.DEBUG;
				}
			} 
			catch (e) 
			{
				// Prevent exception when unable to access parent
			}
			
			// In release, load minified file
			if (!debugMode)
			{
				var name = resource.name;
				
				// Add minified resource to array
				resourcesToLoad.push({ file: name, type: resourceType });
			}			
			// In debug, load each file individually
			else
			{
				// Did we specify any files to load?
				if (resource.files) 
				{
					// Loop through files to load
					var files = resource.files;
					for (var i = 0; i < files.length; i++)
					{
						var resourceObj = files[i];
						if (me.isValidResource(resourceObj))
						{
							// Add minified resource to array
							var fileResource = resourceObj['file'];
							resourcesToLoad.push({ file: fileResource, type: resourceType });
						}
					}
				}
			}
		}
		
		return resourcesToLoad;
	}
	
	/**
	 * Loads the given resources array.
	 * 
	 * @param {Object} resources - Resources to load array
     * @param {Object} packages - dictionary of packages e.g.: {"main":true}.
	 * @author Eran Zinman
	 */
	me.loadResources = function(resources, packages, cbDone)
	{
		// Get resources to load
		var resourcesToLoad = getResourcesToLoad(resources, packages);
		
		// Loop through resources
        var len = resourcesToLoad.length;
        // i - index in "resourcesToLoad" array.
        var loadNext = function(i){
            if (i >= len)
            {
                cbDone && cbDone();
                return;
            }
            var resource = resourcesToLoad[i];
            loadResource(resource.file, resource.type, function() {
                loadNext(i+1);
            });
        };
        loadNext(0);

//		for (var i = 0; i < len; i++)
//		{
//			var resource = resourcesToLoad[i];
//			loadResource3(resource.file, resource.type, (i === len - 1)? cbDone : null);
//		}

        // Document write to HTML
    	//ResourceLoader.flush(cbDone);
	};
	
//	/**
//	 * Loads the given resources array.
//	 *
//	 * @param {Object} resources - Resources to load array
//	 * @param {Object} packages - dictionary of packages e.g.: {"main":true}.
//	 */
//	me.loadResources2 = function(resources, packages, cbDone)
//	{
//        // Check if we are in DEBUG / RELEASE modes. Try to fetch
//        // this state from the parent (if executed from a page)
//        var debugMode = false;
//        try
//        {
//            if (typeof window.DEBUG !== 'undefined')
//            {
//                debugMode = window.DEBUG;
//            }
//            else if (typeof parent.DEBUG !== 'undefined')
//            {
//                debugMode = parent.DEBUG;
//            }
//        }
//        catch (e)
//        {
//            // Prevent exception when unable to access parent
//        }
//
//        // i - index in "resources" array.
//        // j - index in "files" array (in item inside resources, in case of "debug").
//        var loadNext = function(i, j){
////            console.log('i = '+ i +' j = ' + j);
//            if (i >= resources.length)
//            {
//                cbDone && cbDone();
//                return;
//            }
//            var resource = resources[i];
//            if (!packages[resource.packageName])
//            {
//                loadNext(i+1, 0);
//                return;
//            }
//            var resourceType = resource.type;
//            // In release, load minified file
//            if (!debugMode)
//            {
//                loadResource3(resource.name, resourceType, function() {
//                    loadNext(i+1);
//                });
//                return;
//            }
//            var files = resource.files;
//            if (j >= files.length)
//            {
//                loadNext(i+1, 0);
//                return;
//            }
//            var resourceObj = files[j];
//            if (me.isValidResource(resourceObj))
//            {
//                // Add minified resource to array
//                var fileResource = resourceObj['file'];
//                loadResource3(fileResource, resourceType, function() {
//                    loadNext(i, j+1);
//                });
//            }
//            else
//            {
//                loadNext(i, j+1);
//            }
//        };
//        loadNext(0, 0);
//
//	};

	/**
	 * Will make actual write to HTML, to load all the required
	 * resources
	 * 
	 * @author Eran Zinman
	 */
//	me.flush = function(cbDone)
//	{
//        if (cbDone)
//        {
//            _cbDone = cbDone;
////            ResourceLoader.doneLoading();
//        }
//        else
//        {
//		    // Write document write buffer to document
//            document.write(documentWrite);
//        }
//
//		// Clear document write buffer
//		documentWrite = '';
//	};


//	/**
//	 * TBD
//	 */
//	me.doneLoading = function()
//	{
//		_cbDone && _cbDone();
//        _cbDone = null;
//	};

	return me;
}());

/**
 * Self executing function which simply loads the resources array
 * 
 * @author Eran Zinman
 */
(function loadAllResources()
{
	if (window.__resources) 
	{
        ResourceLoader.loadResources(window.__resources, {"main":true});
//        ResourceLoader.loadResources2(window.__resources, {"main":true});
	}
	
	// Document write to HTML
//	ResourceLoader.flush();
})();


