var ReportCtrl = angular.module('ReportCtrl', []);
ReportCtrl.controller('ReportListCtrl', function ($scope, $rootScope, $cookies, httpService) {

    //右边栏显示隐藏
    $rootScope.isShowRightBar = false;

    $scope.noData = false; //默认没有数据
    httpService.get(_AjaxURL.GetReportsList, {

    })
        .success(function (res) {
            if (res.result == 1) {
                $scope.weekReports = [];
                $scope.monReports = [];
                $scope.rePorts = res.data;
                for (var i = 0; i < $scope.rePorts.length; i++) {
                    if ($scope.rePorts[i].IsDemo == '周报') {
                        $scope.weekReports.push($scope.rePorts[i]);
                    } else if ($scope.rePorts[i].IsDemo == '体验报告') {
                        $scope.monReports.push($scope.rePorts[i]);
                    }
                }
                if (res.data.length == 0) {
                    $scope.noData = true;
                }
            }
        })

});
ReportCtrl.controller('ReportDetailCtrl', function ($scope, $rootScope, $cookies, httpService, $stateParams) {
    var testId = $stateParams.testId;
    var testTime = $('#testTime');

    var ComprehensiveScore = $('#ComprehensiveScore');
    var GoodPoints = $('#GoodPoints');
    var NeedToImprove = $('#NeedToImprove');
    var EvalLists = $('.b_content_two_box li');
    var b_cp_tishi = $('.b_cp_tishi');
    // GetTestReprotInfo
    httpService.post(_AjaxURL.GetTestReprotInfo, {
        'id':testId,'type':'show'
    })
        .success(function (res) {
            if (res.Result > 0) {
                var creatTime = res.CreateTime;
                creatTime = creatTime.split('T')[0].replace(/-/g, '.');
                var EvalListArray = res.EvaluationAnalysisList;
                $scope.level = res.EvaluationGrade;
                
                $scope.tEvalLists = EvalListArray[0];
                $scope.fEvalLists = EvalListArray[0];
                $scope.cEvalLists = EvalListArray[0];
                $scope.yEvalLists = EvalListArray[0];
                $scope.lEvalLists = EvalListArray[0];

                // for (var i = 0; i < EvalLists.length; i++) {
                //     EvalLists.eq(i).find('.b_test-num').text(EvalListArray[i].AssessmentScores + '分')
                //     EvalLists.eq(i).find('.b_test_line').css('width', Percentage(EvalListArray[i].AssessmentScores, 100));
                //     EvalLists.eq(i).find('.b_test_bottom_miaoshu').text(EvalListArray[i].AssessmentDesc);

                // }
                var strLevel = '<div class="b_cp_tishi">' +
                    '您的级别<br>' +
                    'level<span>' + level + '</span>' +
                    '</div>';
                $('.cp_box').eq(level - 1).prepend(strLevel);
                $scope.testTime = creatTime;
                $scope.ComprehensiveScore = res.ComprehensiveScore;
                $scope.GoodPoints = res.GoodPoints;
                $scope.NeedToImprove = res.NeedToImprove;
            }
        })

});
ReportCtrl.controller('weekReportDetailCtrl', function($scope, $rootScope, $cookies, httpService, $stateParams,$timeout) {

    $scope.weekId = $stateParams.weekId;

    httpService.get(_AjaxURL.GetWeekReportInfo, {
            'weekId': $scope.weekId
        })
        .success(function(res) {
            if (res.result == 1) {

                $scope.weekDetail = res.data;

                var maxLen = 160;

                if (res.data.StudentDes.length >= maxLen) {
                    $scope.StudentDes = res.data.StudentDes.substring(0, maxLen);
                } else {
                    $scope.StudentDes = res.data.StudentDes;
                }
                $scope.lookpjList($(".lookStar").eq(0),res.data.LessonCount);
                $scope.lookpjList($(".lookStar").eq(1),res.data.OntimeCount);
                $scope.lookpjList($(".lookStar").eq(2),res.data.InteractionCount);
                $scope.lookpjList($(".lookStar").eq(3),res.data.OnesCount);

                setTimeout(function(){
                    $('.cardName').tinytooltip({
                        message: function (tip) {
                            return $(this).html();
                        }
                    });
                },600)
                $scope.CodeImage = res.data.CodeImage;
            } else if (res.result >= 1000) {
                $cookies.remove('tonken');
                $cookies.remove('username');
                $cookies.remove('isComplete');
                $cookies.remove('password');
                $cookies.remove('bookingId');
                // alert('登录时间太久，请重新登录');
                $rootScope.$state.go('index.login');
            }
        })

    setTimeout(print, 1000);

    function print() {
        html2canvas($("div#weekDown"), {
            onrendered: function(canvas) {
                $('#down_button').attr('href', canvas.toDataURL());
                $('#down_button').attr('download', 'myjobdeer.png');
            }
        });
    }

    $scope.lookpjList = function(obj,num){
        for(var i=0;i<num;i++){
            $('<img src="images/report/smallxin.png" alt="">').appendTo($(obj));
        }
    }


});
