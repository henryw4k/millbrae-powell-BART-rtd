$(function() {
  // Get Real Time Departures for northbound trains from Millbrae

  var key = "MW9S-E7SL-26DU-VV8V"; //No string attached Key; http://www.bart.gov/schedules/developers/api
  var origin = "mcar"; //TODO: change to where you are getting on 
  var destination = "mont"; //TODO: change to where you are getting off. 


// http://api.bart.gov/docs/overview/abbrev.aspx
//
// abbr  station
// 12th  12th St. Oakland City Center
// 16th  16th St. Mission (SF)
// 19th  19th St. Oakland
// 24th  24th St. Mission (SF)
// ashb  Ashby (Berkeley)
// balb  Balboa Park (SF)
// bayf  Bay Fair (San Leandro)
// cast  Castro Valley
// civc  Civic Center (SF)
// cols  Coliseum
// colm  Colma
// conc  Concord
// daly  Daly City
// dbrk  Downtown Berkeley
// dubl  Dublin/Pleasanton
// deln  El Cerrito del Norte
// plza  El Cerrito Plaza
// embr  Embarcadero (SF)
// frmt  Fremont
// ftvl  Fruitvale (Oakland)
// glen  Glen Park (SF)
// hayw  Hayward
// lafy  Lafayette
// lake  Lake Merritt (Oakland)
// mcar  MacArthur (Oakland)
// mlbr  Millbrae
// mont  Montgomery St. (SF)
// nbrk  North Berkeley
// ncon  North Concord/Martinez
// oakl  Oakland Int'l Airport
// orin  Orinda
// pitt  Pittsburg/Bay Point
// phil  Pleasant Hill
// powl  Powell St. (SF)
// rich  Richmond
// rock  Rockridge (Oakland)
// sbrn  San Bruno
// sfia  San Francisco Int'l Airport
// sanl  San Leandro
// shay  South Hayward
// ssan  South San Francisco
// ucty  Union City
// wcrk  Walnut Creek
// wdub  West Dublin
// woak  West Oakland



  // Get Real Time Departures for northbound trains 
  $.ajax ({
    url: "http://api.bart.gov/api/etd.aspx?cmd=etd&orig="+origin+"&dir=n&key="+key,
    type: 'GET',
    success: function (data) {
      $('.northbound').prepend('<div class = "direction">Northbound</div>');
      var station = $(data).find('abbr')[0].innerHTML;
      $('.northbound').prepend('<div class = "station">To '+station+'</div>');
      getEtd(data, '.northbound')
    },
    error: function (data) {
      console.error('Error: Failed to fetch data');
    }
  });

  // Get Real Time Departures for southbound trains 
  $.ajax ({
    url: "http://api.bart.gov/api/etd.aspx?cmd=etd&orig="+destination+"&dir=s&key="+key,
    type: 'GET',
    success: function (data) {
      $('.southbound').prepend('<div class = "direction">Southbound</div>');
      var station = $(data).find('abbr')[0].innerHTML;
      $('.southbound').prepend('<div class = "station">To '+station+'</div>');
      getEtd(data, '.southbound');
    },
    error: function (data) {
      console.error('Error:Failed to fetch data');
    }
  });

  var getEtd = function(data, direction) {
    var timeData = {
      'redLine': [],
      'blueLine': [],
      'greenLine': [],
      'yellowLine': [],
      'orangeLine': []
    };
    $(data).find('etd').each(function() {
      var color = $(this).find('color')[0].innerHTML;
      var destination = $(this).find('abbreviation')[0].innerHTML.toLowerCase();
      // Change the destinations of your choice
      if (destination === 'rich' || destination === 'mlbr' || destination === 'pitt') {
        $(this).find('estimate').each(function() {
          var min = $(this).find('minutes')[0].innerHTML;
          switch(color) {
            case 'RED':
              timeData.redLine.push(min);
              break;
            case 'BLUE':
              timeData.blueLine.push(min);
              break;
            case 'GREEN':
              timeData.greenLine.push(min);
              break;
            case 'YELLOW':
              timeData.yellowLine.push(min);
              break;
            case 'ORANGE':
              timeData.orangeLine.push(min);
              break;
          }
        });
      }
    });
    appendData(timeData, direction);
  };

  var appendData = function(data, direction) {
    for (var key in data) {
      for (var i = 0; i < data[key].length; i++) {
        var min = data[key][i];
        if (min === "Leaving") {
          $(direction).append('<div class = ' + key + '>Leaving</div>');
        } else {
          $(direction).append('<div class = ' + key + '><span class = "min">' + min + '</span> mins</div>');
        }
      }
    }
  }

  //initialized calls
  getLocation(function(location){
    console.log(closestBartStation(location['lat'], location['lng']));//should print closest bart stations
  });

  // events handler
  $('#distanceBtn').on('click', function(){
      getLocation(function(location){
        getDiffDistance(location, function(diff){//difference called here. 
            $('#distanceBtn').replaceWith( '<div id="distance"> Walk Time: '+ diff.duration.text +'</div>');
        });
      });
  });



});
