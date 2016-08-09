define(function (require) {
  // get the kibana/icon_vis module, and make sure that it requires the "kibana" module if it
  // didn't already
  var module = require('ui/modules').get('kibana/icon_vis', ['kibana']);

  module.controller('KbnMetricIconVisController', function ($scope, Private, $timeout) {
    var tabifyAggResponse = Private(require('ui/agg_response/tabify/tabify'));

    var metrics = $scope.metrics = [];

    var _animateNumbers = () => {

      var $animteNumbers = $('.metric-container').find('.numberAnimate');

      $animteNumbers.each((index, element) => {

        let initialValue = $(element).text();
        let value = $(element).text().replace(/\D/g, '');

        $(element).animate({
          Counter: value
        }, {

          duration: parseInt($scope.vis.params.animationSpeed),
          easing: 'swing',
          step: (now) => {
            $(element).text(Math.ceil(now));
          },
          complete: () => {
            $(element).text(initialValue);
          }
        });


      })

    }

    $scope.processTableGroups = function (tableGroups) {

      tableGroups.tables.forEach(function (table) {
        table.columns.forEach(function (column, i) {
          var fieldFormatter = table.aggConfig(column).fieldFormatter();
          metrics.push({
            label: column.title,
            value: fieldFormatter(table.rows[0][i])
          });
        });
      });

    };

    $scope.$watch('esResponse', function (resp) {
      if (resp) {
        metrics.length = 0;
        $scope.processTableGroups(tabifyAggResponse($scope.vis, resp));

        if($scope.vis.params.enableAnimation) {
          $timeout(() => {
            _animateNumbers();
          }, 500);
        }
      }
    });
  });
});
