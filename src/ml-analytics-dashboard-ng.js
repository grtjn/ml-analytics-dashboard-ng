(function () {
  'use strict';

  angular.module('ml.analyticsDashboard', [
    'ml.analyticsDashboard.report',
    'ui.dashboard',
    'ui.router'
  ])
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('analytics-dashboard', {
        url: '/analytics-dashboard',
        template: '<ml-analytics-dashboard></ml-analytics-dashboard>'
      })
      .state('analytics-dashboard.new-report', {
        url: '/new-report',
        templateUrl: 'templates/new-report.html',
        controller: 'NewReportCtrl'
      })
      .state('analytics-dashboard.home', {
        url: '/home',
        templateUrl: 'templates/home.html',
        controller: 'HomeCtrl'
      })
      .state('analytics-dashboard.designer', {
        url: '/designer{uri:path}',
        templateUrl: 'templates/designer.html',
        controller: 'ReportDesignerCtrl',
        resolve: {
          ReportData: function($stateParams, ReportService) {
            //MarkLogic.Util.showLoader();
            var uri = $stateParams.uri;
            return ReportService.getReport(uri).then(function(response) {
              //MarkLogic.Util.hideLoader();
              return response;
            });
          }
        }
      })
      .state('analytics-dashboard.remover', {
        url: '/remover{uri:path}',
        templateUrl: 'templates/remover.html',
        controller: 'ReportRemoverCtrl'
      })
      .state('analytics-dashboard.editor', {
        url: '/editor{uri:path}',
        templateUrl: 'templates/editor.html',
        controller: 'ReportEditorCtrl',
        resolve: {
          ReportData: function($stateParams, ReportService) {
            //MarkLogic.Util.showLoader();
            var uri = $stateParams.uri;
            return ReportService.getReport(uri).then(function(response) {
              //MarkLogic.Util.hideLoader();
              return response;
            });
          }
        }
      });
  }

}());
