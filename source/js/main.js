// Returns query string parameters from given URL.
// getUrlParameterByName("json") will return "xyz.json"
// for URL http://example.com/index.html?json=xyz.json
function getUrlParameterByName(name)
{
  name = name.replace(/[\[]/, "\\\[").replace(/[\]]/, "\\\]");
  var regexS = "[\\?&]" + name + "=([^&#]*)";
  var regex = new RegExp(regexS);
  var results = regex.exec(window.location.search);
  return results == null
    ? ""
    : decodeURIComponent(results[1].replace(/\+/g, " "));
}

// Returns json file from URL query string parameters.
// If URL does not contain a parameter, returns the supplied default value.
function discoverJsonUrl(defaultPath) {
  jsonPath = getUrlParameterByName("json");
  return jsonPath != ""
    ? jsonPath
    : defaultPath;
}


function loadResultData(resultPath, chartCallback) {
  $.ajax({
    url: resultPath,
    dataType: 'json',
    success: function(jsonData) {
      chartCallback(jsonData);
    }
  });
}


function friendlyDateTime(datetime, separator) {
  var separator = separator === undefined
    ? " klo "
    : separator;

  var date = new Date(datetime);
  var friendlyDate = $.datepicker.formatDate('dd.mm.yy', date);
  var friendlyTime = date.getHours() + ":" + date.getMinutes();

  return friendlyDate + separator + friendlyTime;
}