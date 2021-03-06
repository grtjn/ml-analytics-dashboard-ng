(function(module) {
try {
  module = angular.module('ml.analyticsDashboard');
} catch (e) {
  module = angular.module('ml.analyticsDashboard', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/templates/dashboard.html',
    '<div id="analytics-dashboard"><div class="col-md-3"><span class="menu-title">Manage Reports</span><p ng-if="!currentUser" style="padding-left:8px;">Please log in to view reports.</p><div class="alert alert-warning" ng-show="showLoading">Loading Reports...</div><form ng-if="currentUser" name="filterForm" class="filter-form" novalidate=""><input type="text" class="form-control" ng-model="search.name" placeholder="Filter reports"></form><div class="report-palette"><div class="report-container"><div class="report-container-inner"><div class="report-item" ng-repeat="report in reports | filter : search"><i class="fa fa-th"></i><span>{{report.name}}</span><div class="toolbar"><a class="btn btn-link" data-ng-click="gotoDesigner(report.uri)"><i class="fa fa-dashboard"></i></a> <a class="btn btn-link" data-ng-click="showReportEditor(report)"><i class="fa fa-edit"></i></a> <a class="btn btn-link" data-ng-click="showReportRemover(report)"><i class="fa fa-trash-o"></i></a></div></div></div></div></div><div ng-if="currentUser" class="btn-toolbar" style="margin-left:10px;margin-top:10px"><div class="btn-group"><button class="btn btn-primary" ng-click="createReport()"><span class="fa fa-check"></span> New Report</button></div></div></div><div class="col-md-9"><div class="container-fluid workspace-view"><ui-view></ui-view></div></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('ml.analyticsDashboard');
} catch (e) {
  module = angular.module('ml.analyticsDashboard', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/templates/designer.html',
    '<div class="row"><div class="col-md-12"><span class="view-title">{{report.name}}</span><p>{{report.description}}</p><div dashboard="reportDashboardOptions"></div></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('ml.analyticsDashboard');
} catch (e) {
  module = angular.module('ml.analyticsDashboard', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/templates/editor.html',
    '<div class="row" ng-if="!currentUser"><div class="col-md-12">Please log in to edit report.</div></div><div class="row" ng-if="currentUser"><div class="col-md-12"><span class="view-title">Edit Report</span><p>The fields marked with asterisk <i class="fa fa-asterisk mandatory-field"></i> are mandatory.</p><form name="editReportForm" ng-submit="updateReport()" novalidate=""><div class="form-group"><label class="control-label">Name <i class="fa fa-asterisk mandatory-field"></i></label> <input type="text" name="name" class="form-control" ng-model="report.name" readonly=""></div><div class="form-group"><label class="control-label">Description</label> <input type="text" name="description" class="form-control" ng-model="report.description"></div><div class="form-group" ng-class="{ \'has-error\' : editReportForm.classification.$invalid && !editReportForm.classification.$pristine }"><label class="control-label">Classification <i class="fa fa-asterisk mandatory-field"></i></label> <input type="text" name="classification" class="form-control" ng-model="report.classification" required=""><p ng-show="editReportForm.classification.$invalid && !editReportForm.classification.$pristine" class="help-block">Classification is required.</p></div><div class="form-group"><label class="control-label">Privacy</label><div class="hcontainer"><ul class="hoptions"><li ng-class="{current:isActive(\'public\')}"><div class="radio"><label><input type="radio" data-ng-click="setOption(\'public\')" ng-model="report.privacy" name="privacy" value="public">Public</label></div></li><li ng-class="{current:isActive(\'private\')}"><div class="radio"><label><input type="radio" data-ng-click="setOption(\'private\')" ng-model="report.privacy" name="privacy" value="private">Private</label></div></li></ul><div class="hpanel"><div class="hcontent" ng-class="{show:isActive(\'public\')}"><p>A public report is available for anyone to view.</p></div><div class="hcontent" ng-class="{show:isActive(\'private\')}"><p>A private report is only available for its owner.</p></div></div></div></div><div class="btn-toolbar" role="toolbar" style="margin-top:10px"><div class="btn-group pull-right"><button type="submit" class="btn btn-primary" ng-disabled="editReportForm.$invalid"><span class="fa fa-check"></span> Submit</button></div></div></form></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('ml.analyticsDashboard');
} catch (e) {
  module = angular.module('ml.analyticsDashboard', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/templates/facets.html',
    '<div class="facet-list"><div class="chiclets"><div ng-repeat="(index, facet) in facets | object2Array | filter:{selected: true}"><div class="btn btn-primary" ng-repeat="value in facet.facetValues | filter:{selected: true}"><span title="{{ value.name }}">{{ facet.__key }}: {{ value.name | truncate:truncateLength }}</span> <span class="glyphicon glyphicon-remove-circle icon-white" ng-click="toggle({facet: facet.__key, value: value.name})"></span></div></div></div><div class="facet" ng-if="facet.facetValues.length" ng-repeat="(index, facet) in facets | object2Array | filter:{selected: \'!\'+true}"><h3>{{ prettyname({facet: facet.__key}) }}</h3><div ng-repeat="value in facet.facetValues"><a ng-click="toggle({facet: facet.__key, value: value.name})" title="{{ value.name }}"><span ng-if="value.name">{{ value.name | truncate:truncateLength }}</span> <em ng-if="!value.name">blank</em></a> <span>({{ value.count }})</span></div><div ng-if="shouldShowMore &amp;&amp; !facet.displayingAll"><a href="" ng-click="showMore({facet: facet, facetName: facet.__key})">see more ...</a></div></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('ml.analyticsDashboard');
} catch (e) {
  module = angular.module('ml.analyticsDashboard', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/templates/home.html',
    '<div class="row"><div class="col-md-12"><span class="view-title">Welcome to Analytics Dashboard</span><p>Analytics Dashboard is an online reporting and business intelligence service that helps you easily analyze your business data, and create insightful reports for informed decision-making. It allows you to easily create and share powerful reports in minutes from MarkLogic database.</p><p><b>Sample Monthly Budget 2015 vs. 2014</b></p><p><canvas id="budget-canvas" style="height:300px;max-width:100%;width:auto;"></canvas></p><p>MarkLogic\'s full-text search engine makes it an ideal platform to power advanced search applications. MarkLogic’s full-text search includes faceting, real-time alerting, type-ahead suggestions, snippeting, language support, and much more.</p></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('ml.analyticsDashboard');
} catch (e) {
  module = angular.module('ml.analyticsDashboard', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/templates/new-report.html',
    '<h1>Create New Report</h1><div class="row" ng-if="!currentUser"><div class="col-md-12">Please log in to create new report.</div></div><div class="row" ng-if="currentUser"><div class="col-md-12"><p>A report primarily consists of widgets. This view will create a blank report. You can then add widgets into the report using the Report Dashboard.</p><p>The fields marked with asterisk <i class="fa fa-asterisk mandatory-field"></i> are mandatory.</p><form name="newReportForm" ng-submit="createReport()" novalidate=""><div class="form-group" ng-class="{ \'has-error\' : newReportForm.name.$invalid && !newReportForm.name.$pristine }"><label class="control-label">Name <i class="fa fa-asterisk mandatory-field"></i></label> <input type="text" name="name" class="form-control" ng-model="report.name" required=""><p ng-show="newReportForm.name.$invalid && !newReportForm.name.$pristine" class="help-block">Name is required.</p></div><div class="form-group"><label class="control-label">Description</label> <input type="text" name="description" class="form-control" ng-model="report.description"></div><div class="form-group" ng-class="{ \'has-error\' : newReportForm.classification.$invalid && !newReportForm.classification.$pristine }"><label class="control-label">Classification <i class="fa fa-asterisk mandatory-field"></i></label> <input type="text" name="classification" class="form-control" ng-model="report.classification" required=""><p ng-show="newReportForm.classification.$invalid && !newReportForm.classification.$pristine" class="help-block">Classification is required.</p></div><div class="form-group"><label class="control-label">Privacy</label><div class="hcontainer"><ul class="hoptions"><li ng-class="{current:isActive(\'public\')}"><div class="radio"><label><input type="radio" data-ng-click="setOption(\'public\')" ng-model="report.privacy" name="privacy" value="public">Public</label></div></li><li ng-class="{current:isActive(\'private\')}"><div class="radio"><label><input type="radio" data-ng-click="setOption(\'private\')" ng-model="report.privacy" name="privacy" value="private">Private</label></div></li></ul><div class="hpanel"><div class="hcontent" ng-class="{show:isActive(\'public\')}"><p>A public report is available for anyone to view.</p></div><div class="hcontent" ng-class="{show:isActive(\'private\')}"><p>A private report is only available for its owner.</p></div></div></div></div><div class="btn-toolbar" role="toolbar" style="margin-top:10px"><div class="btn-group pull-right"><button type="submit" class="btn btn-primary" ng-disabled="newReportForm.$invalid"><span class="fa fa-check"></span> Submit</button></div></div></form><p>{{error_message}}</p></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('ml.analyticsDashboard');
} catch (e) {
  module = angular.module('ml.analyticsDashboard', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/templates/percentage.html',
    '<div>Watch scope property<div class="alert alert-danger">{{percentage}}</div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('ml.analyticsDashboard');
} catch (e) {
  module = angular.module('ml.analyticsDashboard', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/templates/remover.html',
    '<div class="row" ng-if="!currentUser"><div class="col-md-12">Please log in to remove report.</div></div><div class="row" ng-if="currentUser"><div class="col-md-12"><span class="view-title">Delete Report</span><p>This action will delete the report. Are you sure you want to continue?</p><button type="button" class="btn btn-default" data-ng-click="cancel()"><span class="fa fa-close"></span> Cancel</button> <button type="button" class="btn btn-primary" data-ng-click="deleteReport()"><span class="fa fa-check"></span> OK</button></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('ml.analyticsDashboard');
} catch (e) {
  module = angular.module('ml.analyticsDashboard', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/templates/indexes/path-namespace.html',
    '<div class="form-group" ng-class="{ \'has-error\' : indexForm.prefix.$invalid && !indexForm.prefix.$pristine }"><label class="col-sm-4 control-label">prefix <i class="fa fa-asterisk mandatory-field"></i></label><div class="col-sm-8"><input type="text" name="prefix" class="form-control" ng-model="current_index.prefix" required=""><p ng-show="indexForm.prefix.$invalid && !indexForm.prefix.$pristine" class="help-block">prefix is required.</p></div></div><div class="form-group" ng-class="{ \'has-error\' : indexForm.namespaceUri.$invalid && !indexForm.namespaceUri.$pristine }"><label class="col-sm-4 control-label">namespace uri <i class="fa fa-asterisk mandatory-field"></i></label><div class="col-sm-8"><input type="text" name="namespaceUri" class="form-control" ng-model="current_index[\'namespace-uri\']" required=""><p ng-show="indexForm.namespaceUri.$invalid && !indexForm.namespaceUri.$pristine" class="help-block">namespace uri is required.</p></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('ml.analyticsDashboard');
} catch (e) {
  module = angular.module('ml.analyticsDashboard', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/templates/indexes/range-element-attribute-index.html',
    '<div class="form-group"><label class="col-sm-4 control-label">parent namespace uri</label><div class="col-sm-8"><input type="text" name="parentNamespaceUri" class="form-control" ng-model="current_index[\'parent-namespace-uri\']"></div></div><div class="form-group" ng-class="{ \'has-error\' : indexForm.parentLocalname.$invalid && !indexForm.parentLocalname.$pristine }"><label class="col-sm-4 control-label">parent localname <i class="fa fa-asterisk mandatory-field"></i></label><div class="col-sm-8"><input type="text" name="parentLocalname" class="form-control" ng-model="current_index[\'parent-localname\']" required=""><p ng-show="indexForm.parentLocalname.$invalid && !indexForm.parentLocalname.$pristine" class="help-block">parent localname uri is required.</p></div></div><div class="form-group"><label class="col-sm-4 control-label">namespace uri</label><div class="col-sm-8"><input type="text" name="namespaceUri" class="form-control" ng-model="current_index[\'namespace-uri\']"></div></div><div class="form-group" ng-class="{ \'has-error\' : indexForm.localname.$invalid && !indexForm.localname.$pristine }"><label class="col-sm-4 control-label">localname <i class="fa fa-asterisk mandatory-field"></i></label><div class="col-sm-8"><input type="text" name="localname" class="form-control" ng-model="current_index[\'localname\']" required=""><p ng-show="indexForm.localname.$invalid && !indexForm.localname.$pristine" class="help-block">localname uri is required.</p></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('ml.analyticsDashboard');
} catch (e) {
  module = angular.module('ml.analyticsDashboard', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/templates/indexes/range-element-index.html',
    '<div class="form-group"><label class="col-sm-4 control-label">namespace uri</label><div class="col-sm-8"><input type="text" name="namespaceUri" class="form-control" ng-model="current_index[\'namespace-uri\']"></div></div><div class="form-group" ng-class="{ \'has-error\' : indexForm.localname.$invalid && !indexForm.localname.$pristine }"><label class="col-sm-4 control-label">localname <i class="fa fa-asterisk mandatory-field"></i></label><div class="col-sm-8"><input type="text" name="localname" class="form-control" ng-model="current_index[\'localname\']" required=""><p ng-show="indexForm.localname.$invalid && !indexForm.localname.$pristine" class="help-block">localname uri is required.</p></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('ml.analyticsDashboard');
} catch (e) {
  module = angular.module('ml.analyticsDashboard', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/templates/indexes/range-field-index.html',
    '<div class="form-group" ng-class="{ \'has-error\' : indexForm.fieldname.$invalid && !indexForm.fieldname.$pristine }"><label class="col-sm-4 control-label">fieldname <i class="fa fa-asterisk mandatory-field"></i></label><div class="col-sm-8"><input type="text" name="fieldname" class="form-control" ng-model="current_index[\'field-name\']" required=""><p ng-show="indexForm.fieldname.$invalid && !indexForm.fieldname.$pristine" class="help-block">field name uri is required.</p></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('ml.analyticsDashboard');
} catch (e) {
  module = angular.module('ml.analyticsDashboard', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/templates/indexes/range-path-index.html',
    '<div class="form-group" ng-class="{ \'has-error\' : indexForm.pathExpression.$invalid && !indexForm.pathExpression.$pristine }"><label class="col-sm-4 control-label">path expression <i class="fa fa-asterisk mandatory-field"></i></label><div class="col-sm-8"><input type="text" name="pathExpression" class="form-control" ng-model="current_index[\'path-expression\']" required=""><p ng-show="indexForm.pathExpression.$invalid && !indexForm.pathExpression.$pristine" class="help-block">path expression uri is required.</p></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('ml.analyticsDashboard');
} catch (e) {
  module = angular.module('ml.analyticsDashboard', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/templates/widgets/qb-settings.html',
    '<div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true" ng-click="cancel()">&times;</button><h3>Settings Dialog for <small>{{widget.title}}</small></h3></div><div class="modal-body"><form name="form" novalidate="" class="form-horizontal"><div class="form-group"><label for="widgetTitle" class="col-sm-3 control-label">Title</label><div class="col-sm-9"><input type="text" class="form-control" name="widgetTitle" ng-model="result.title"></div></div><div class="form-group"><label class="col-sm-3 control-label">Page Length</label><div class="col-sm-9"><input type="number" class="form-control" name="pageLength" ng-model="result.dataModelOptions.pageLength"></div></div><div class="form-group"><label class="col-sm-3 control-label">Chart Type</label><div class="col-sm-9"><select class="form-control" ng-model="result.dataModelOptions.chart"><option>column</option><option>pie</option></select></div></div><div class="form-group has-feedback" ng-repeat="parameter in result.dataModelOptions.parameters"><div class="col-sm-5"><input type="text" class="form-control" ng-model="parameter.name"></div><div class="col-sm-7"><div class="input-group"><input type="text" class="form-control" ng-model="parameter.value"><div class="input-group-btn" style="vertical-align:top;"><a type="button" class="btn btn-danger" data-ng-click="deleteParameter($index)"><i class="fa fa-minus"></i></a></div></div></div></div><div ng-if="widget.partialSettingTemplateUrl" ng-include="widget.partialSettingTemplateUrl"></div></form></div><div class="modal-footer"><button type="button" class="btn btn-default navbar-left" ng-click="addParameter()">Add Parameter</button> <button type="button" class="btn btn-default" ng-click="cancel()">Cancel</button> <button type="button" class="btn btn-primary" ng-click="ok()">OK</button></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('ml.analyticsDashboard');
} catch (e) {
  module = angular.module('ml.analyticsDashboard', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/templates/widgets/query-builder.html',
    '<div><div ng-if="widget.mode === \'Design\'" class="design-mode"><p>The Query Builder, in this design mode, allows you to configure query rules without writing any custom code. <button class="btn btn-info btn-sm" ng-click="widget.mode = \'View\'">Switch to view mode</button></p><form name="designForm" class="form-inline" novalidate=""><div class="form-group"><label class="control-label">Database:</label><select class="form-control" ng-options="database for database in model.config.databases" ng-model="model.config[\'current-database\']" ng-change="getDbConfig()"></select></div><div class="form-group"><label class="control-label">Limited By:</label><select class="form-control" ng-model="model.groupingStrategy" ng-change="getDbConfig()"><option>root</option><option>collection</option></select><span ng-show="model.loadingConfig">&nbsp;<i class="fa fa-spinner fa-spin"></i></span></div><div class="form-group"><label class="control-label">Name:</label><select class="form-control" ng-model="data.directory_model" ng-options="d.name for d in data.docs" ng-change="setDocument()" required=""><option value="">Choose...</option></select></div><button class="btn btn-default" ng-click="save()" ng-disabled="designForm.$invalid"><span class="fa fa-check"></span> Save</button> <button class="btn btn-default" ng-click="execute()" ng-disabled="designForm.$invalid"><span class="fa fa-eye"></span> Run</button> <span ng-show="model.loadingResults">&nbsp;<i class="fa fa-spinner fa-spin"></i></span></form><div class="row" style="margin-top:10px" ng-if="model.configError"><div class="col-md-12"><div class="alert alert-danger">{{model.configError}}</div></div></div><div class="row" ng-show="model.showBuilder"><div class="col-md-5"><h3 class="qb-title">Define Dimensions & Computations</h3><div dimension-builder="data"></div></div><div class="col-md-7"><h3 class="qb-title">Define Query Rules</h3><div sq-builder="data"></div></div></div><div class="table-responsive" ng-if="executor.results.length>0"><pagination ng-model="grid.page" ng-change="fetchPage()" max-size="10" boundary-links="true" total-items="grid.total" items-per-page="widget.dataModelOptions.pageLength"></pagination><table class="table table-bordered"><thead><tr><th data-ng-repeat="dimension in executor.dimensions">{{dimension.name}}</th></tr></thead><tbody><tr data-ng-repeat="row in executor.results"><td data-ng-repeat="cell in row track by $index">{{cell}}</td></tr></tbody></table></div><div class="table-responsive" ng-if="model.results.results"><div ng-if="model.queryError" class="alert alert-danger">{{ model.queryError }}</div><p ng-if="model.results" class="metrics"><em>{{ model.results.results.length }} results in {{ model.results.metrics[\'total-time\'] }}</em></p><table class="table table-bordered"><thead><tr><th ng-repeat="header in model.results.headers">{{ header }}</th></tr></thead><tbody><tr ng-repeat="result in model.results.results track by $index"><td ng-repeat="val in result track by $index"><em ng-if="val === \'\'"></em> <span ng-if="val !== \'\'">{{ val }}</span></td></tr></tbody></table></div><div class="hcontainer"></div><div class="row" ng-show="model.showBuilder"><div class="col-md-5"><h3>Dimensions & Computations</h3><pre ng-bind="showDimensions()"></pre></div><div class="col-md-7"><h3>Query Rules <button class="btn btn-default" ng-click="edit()">Edit</button></h3><pre ng-bind="showQuery()"></pre></div></div></div><div id="query-editor-dialog" class="modal modal-wide" role="dialog"><div class="modal-dialog"><div class="modal-content"><div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button><h4 class="modal-title">Edit Query Rules</h4></div><div class="modal-body"><div id="query-editor"></div></div><div class="modal-footer"><button type="button" class="btn btn-primary" data-ng-click="save()"><span class="fa fa-check"></span> Save</button> <button type="button" class="btn btn-default" data-dismiss="modal"><span class="fa fa-close"></span> Close</button></div></div></div></div><div ng-if="widget.mode === \'View\'" class="view-mode"><p>This view mode displays the query results of the Query Builder. <button class="btn btn-info btn-sm" ng-click="widget.mode = \'Design\'">Switch to design mode</button></p><form name="viewForm" class="form-inline" style="margin-bottom:10px;margin-bottom:10px"><div class="form-group"><label class="control-label">Search:</label> <input type="text" name="name" class="form-control" ng-model="executor.simple"></div><button class="btn btn-primary" ng-disabled="executor.disableRun" ng-click="execute()"><span class="fa fa-eye"></span> Run Report</button> <button class="btn btn-default" ng-click="download()" ng-disabled="executor.disableDownload"><span class="fa fa-download"></span> Download Report</button> <span ng-show="model.loadingResults">&nbsp;<i class="fa fa-spinner fa-spin"></i></span></form><div class="table-responsive" ng-if="executor.results.length>0"><pagination ng-model="grid.page" ng-change="fetchPage()" max-size="10" boundary-links="true" total-items="grid.total" items-per-page="widget.dataModelOptions.pageLength"></pagination><table class="table table-bordered"><thead><tr><th data-ng-repeat="dimension in executor.dimensions">{{dimension.name}}</th></tr></thead><tbody><tr data-ng-repeat="row in executor.results"><td data-ng-repeat="cell in row track by $index">{{cell}}</td></tr></tbody></table></div><div class="table-responsive" ng-if="model.results.results"><div ng-if="model.queryError" class="alert alert-danger">{{ model.queryError }}</div><p ng-if="model.results" class="metrics"><em>{{ model.results.results.length }} results in {{ model.results.metrics[\'total-time\'] }}</em></p><table ng-table-dynamic="tableParams with cols" class="table table-condensed table-bordered table-striped"><tr ng-repeat="row in $data"><td ng-repeat="col in $columns">{{row[col.field]}}</td></tr></table></div><div class="hcontainer"></div></div></div>');
}]);
})();

(function(module) {
try {
  module = angular.module('ml.analyticsDashboard');
} catch (e) {
  module = angular.module('ml.analyticsDashboard', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('/templates/widgets/time-settings.html',
    '<div class="modal-header"><button type="button" class="close" data-dismiss="modal" aria-hidden="true" ng-click="cancel()">&times;</button><h3>Settings Dialog for <small>{{widget.title}}</small></h3></div><div class="modal-body"><form name="form" novalidate="" class="form-horizontal"><div class="form-group"><label for="widgetTitle" class="col-sm-3 control-label">Title</label><div class="col-sm-9"><input type="text" class="form-control" name="widgetTitle" ng-model="result.title"></div></div><div class="form-group"><label for="timeFormat" class="col-sm-3 control-label">Time Format</label><div class="col-sm-9"><input type="text" class="form-control" name="timeFormat" ng-model="result.dataModelOptions.format"></div></div><div ng-if="widget.partialSettingTemplateUrl" ng-include="widget.partialSettingTemplateUrl"></div></form></div><div class="modal-footer"><button type="button" class="btn btn-default" ng-click="cancel()">Cancel</button> <button type="button" class="btn btn-primary" ng-click="ok()">OK</button></div>');
}]);
})();
