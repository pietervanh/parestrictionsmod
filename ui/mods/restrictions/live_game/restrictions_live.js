//IntelliSense for WebMatrix /VS
/// <reference path="../.vsdoc/jquery-1.9.1-vsdoc.js" /> 
/// <reference path="../.vsdoc/knockout-2.2.1.debug.js" />

var restrictions = ["/pa/units/land/tactical_missile_launcher/tactical_missile_launcher.json",
                    "/pa/units/land/artillery_long/artillery_long.json",
                    "/pa/units/land/artillery_short/artillery_short.json",
                    "/pa/units/land/air_defense/air_defense.json",
                    "/pa/units/land/laser_defense_adv/laser_defense_adv.json",
                    "/pa/units/land/laser_defense/laser_defense.json",
                    "/pa/units/land/laser_defense_single/laser_defense_single.json",
                    "/pa/units/sea/torpedo_launcher/torpedo_launcher.json",
                    "/pa/units/sea/torpedo_launcher_adv/torpedo_launcher_adv.json"];

function checkRestrictions(unitid)
{
	var result = true;
	_.forEach(restrictions, function(restriction)
	{
	  if(restriction == unitid)
	  {
		
		 result = false;
		 return false;  
	  }
	});
	return result;
};

//replace buildbar item
//prio must be higher than hotbuild 2 otherwise it keypreview will fail
$('.div_build_item').replaceWith(
				'<div class="div_build_item" id="bld1" data-bind="visible: checkRestrictions($data.id()), event: { mouseover: function () { $parent.setBuildHover($index()) },' +
				'                                                          mousedown: function (data,event) { $parent.executeStartBuild(event, $index())} }">' +
				'    <span class="span_build_count" data-bind="text: count, visible: count() > 0"></span>' +
				'    <a href="#" data-bind="rollover_sound_exclusive: { sound: \'default\', group: $index()}">' +
				'        <img class="img_build_unit" src="img/build_bar/units/build_unit_sample.png" data-bind="attr: { src: icon }" />' +
				'    </a>'+
				'</div>'

);

model.maybeSetBuildTarget = function (spec_id) {
	var list = (model.buildTabLists().length) ? model.buildTabLists()[0] : []; // first build tab is 'all'
	var i;

	engine.call("unit.debug.setSpecId", spec_id);

	for (i = 0; i < list.length; i++){
	    if(checkRestrictions(spec_id))
		{
			if (list[i].id === spec_id) {
				model.buildItemBySpec(spec_id);
				return;
			}
		}
	}
}