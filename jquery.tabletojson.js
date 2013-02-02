/**
  Table To JSON jQuery Plugin
  by Daniel White - developerdan.com

  Copyright (c) 2013 Daniel White. Released under the MIT License.

  Version: 0.2.0

  Feel free to contribute to this project on GitHub by
  submitting pull requests and reporting issues @
  http://github.com/lightswitch05/table-to-json
**/
(function( $ ) {
  $.fn.tableToJSON = function(opts) {

    // Set options
    var defaults = {
      ignoreColNum: [],
      ignoreHiddenRows: true
    };
    opts = $.extend(defaults, opts);

    // Gather headings
    var headings = new Array();
    this.find("thead tr th").each(function(colIndex, col) {
      if($.inArray(colIndex, opts.ignoreColNum) == -1) {
        if($(col).data("column-name") != undefined || $(col).data("column-name") != null) {
          headings[colIndex] = $(col).data("column-name");
        } else {
          headings[colIndex] = $(col).text().trim();
        }
      } else {
        headings[colIndex] = null;
      }
    });

    var visible = ":visible";
    if(!opts.ignoreHiddenRows){
      visible = "";
    }

    // Gather values
    var values = new Array();
    this.find("tbody tr").filter(visible).each(function(rowIndex, row) {
      values[rowIndex] = {};
      $(row).find("td").each(function(colIndex, col) {
        if( headings[colIndex] != null ){
          if($(col).data("cell-value") != undefined || $(col).data("cell-value") != null) {
            values[rowIndex][ headings[colIndex] ] = $(col).data("cell-value");
          } else {
            values[rowIndex][ headings[colIndex] ] = $(col).text().trim();
          }
        }
      });
    });
    return values;
  };
})( jQuery );

