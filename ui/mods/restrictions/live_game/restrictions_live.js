//IntelliSense for WebMatrix /VS
/// <reference path="../.vsdoc/jquery-1.9.1-vsdoc.js" /> 
/// <reference path="../.vsdoc/knockout-2.2.1.debug.js" />

var settings = decode(localStorage.settings);
var restrictions = ["/pa/units/air/air_factory/air_factory.json","/pa/units/land/energy_plant/energy_plant.json"];

function checkRestrictions(unitid)
{
  var result = true;
  for(var restriction in restrictions)
  {
      if(restriction == unitid)
      {
         result = false;
         break;  
      }
  }
  return result;
}

//if (settings.applyrestrictions === "ON") {


    //replace buildbar item
    //prio must be higher than hotbuild 2 otherwise it keypreview will fail
    $('.div_build_item').replaceWith(
                    '<div class="div_build_item" id="bld1" data-bind="visible: checkRestrictions($data.id()), event: { mouseover: function () { $parent.setBuildHover($index()) },' +
                    '                                                          mousedown: function (data,event) { $parent.executeStartBuild(event, $index())} }">' +
                    '    <span class="span_build_count" data-bind="text: count, visible: count() > 0"></span>' +
                    '    <a href="#" data-bind="rollover_sound_exclusive: { sound: 'default', group: $index()}">' +
                    '        <img class="img_build_unit" src="img/build_bar/units/build_unit_sample.png" data-bind="attr: { src: icon }" />' +
                    '    </a>'+
                    '</div>'

);
//}