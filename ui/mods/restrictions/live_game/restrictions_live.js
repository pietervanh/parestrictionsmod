//IntelliSense for WebMatrix /VS
/// <reference path="../.vsdoc/jquery-1.9.1-vsdoc.js" /> 
/// <reference path="../.vsdoc/knockout-2.2.1.debug.js" />
var restrictions_live = (function() {
	
	//load html dynamically
	loadTemplate = function (element, url, model) {
		element.load(url, function () {
		    console.log("Loading html " + url);
		    ko.applyBindings(model, element.get(0));
		});
	};
	
	
	
	var restrictions_live = {};
	
	restrictions_live.restrictions = ko.observableArray([]);
	
	restrictions_live.checkRestrictions = function(unitid){
	    var result = true;
	    //debugger;
		_.forEach(restrictions_live.restrictions(), function (restrictionset) {
		    _.forEach(restrictionset.rules, function (restriction) {
		        if (restriction === unitid) {
		            result = false;
		            return false;
		        }
		    });
		    if(!result)
		    {
		        return false;
		    }
		});
		return result;
	};

	//replace buildbar item
	//prio must be higher than hotbuild 2 otherwise it keypreview will fail
	$('.div_build_item').replaceWith(
					'<div class="div_build_item" id="bld1" data-bind="visible: restrictions_live.checkRestrictions($data.id()), event: { mouseover: function () { $parent.setBuildHover($index()) },' +
					'                                                          mousedown: function (data,event) { $parent.executeStartBuild(event, $index())} }">' +
					'    <span class="span_build_count" data-bind="text: count, visible: count() > 0"></span>' +
					'    <a href="#" data-bind="rollover_sound_exclusive: { sound: \'default\', group: $index()}">' +
					'        <img class="img_build_unit" src="img/build_bar/units/build_unit_sample.png" data-bind="attr: { src: icon }" />' +
					'    </a>'+
					'</div>'
	
	);
	
	restrictions_live.restrictionoptions = ko.observableArray([]);
	var nodefence = {'name':'No Defences','rules':["/pa/units/land/tactical_missile_launcher/tactical_missile_launcher.json",
	                    "/pa/units/land/artillery_long/artillery_long.json",
	                    "/pa/units/land/artillery_short/artillery_short.json",
	                    "/pa/units/land/air_defense/air_defense.json",
	                    "/pa/units/land/laser_defense_adv/laser_defense_adv.json",
	                    "/pa/units/land/laser_defense/laser_defense.json",
	                    "/pa/units/land/laser_defense_single/laser_defense_single.json",
	                    "/pa/units/sea/torpedo_launcher/torpedo_launcher.json",
	                    "/pa/units/sea/torpedo_launcher_adv/torpedo_launcher_adv.json"]};
	var nonuke = { 'name': 'No Nuke', 'rules': ["/pa/units/land/nuke_launcher/nuke_launcher.json", "/pa/units/land/anti_nuke_launcher/anti_nuke_launcher.json"] };

	restrictions_live.selectedRestriction = ko.observable();
	restrictions_live.restrictionoptions.push(nodefence);
	restrictions_live.restrictionoptions.push(nonuke);
        
        
        restrictions_live.addRestriction = function(){
        	//add rule should do something like this.	                    	
            restrictions_live.restrictions(restrictions_live.restrictions().concat(restrictions_live.selectedRestriction()));
        };
        
        restrictions_live.delRestriction = function () {
            restrictions_live.restrictions.remove(restrictions_live.selectedRestriction());
            /*
            _.forEach(restrictions_live.selectedRestriction().rules, function (rule) {
                restrictions_live.restrictions.remove(rule);
            });
            */
        };
        
        //test line should be removed
	//restrictions_live.restrictions(restrictions_live.restrictions().concat(restrictions_live.restrictionoptions()[0].rules));
	
	
	model.maybeSetBuildTarget = function (spec_id) {
		var list = (model.buildTabLists().length) ? model.buildTabLists()[0] : []; // first build tab is 'all'
		var i;
	
		engine.call("unit.debug.setSpecId", spec_id);
	
		for (i = 0; i < list.length; i++){
		    if(restrictions_live.checkRestrictions(spec_id)){
				if (list[i].id === spec_id) {
					model.buildItemBySpec(spec_id);
					return;
				}
			}
		}
	}

	createFloatingFrame('restrictions_info_frame', 220, 70, { 'offset': 'leftCenter', 'top': -250 });
	loadTemplate($('#restrictions_info_frame_content'), '../../mods/restrictions/live_game/restrictions_live.html', restrictions_live);
	
	
	return restrictions_live;
})();
