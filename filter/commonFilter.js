var comfilter = angular.module('comfilter', []);
comfilter.filter('numSplit', function () {
	return function (num) {
		if (num >= 1000) {
			return '999+';
		} else {
			return num;
		}
	}
});
comfilter.filter('dayFilter', function ($rootScope, $filter) {
	return function (strDateEnd) {
		var eTime = strDateEnd.split(' ')[0];
		var sTime = $filter('date')($rootScope.serviceTime, 'yyyy-MM-dd');
		var eTimes = new Date(eTime);
		var sTimes = new Date(sTime);
		return $filter('date')(eTimes - sTimes, 'MM:dd')
	}
});
comfilter.filter('status1', function () {//学员的考勤状态
	return function (num) {
		if (num == 0) {
			return '学员缺勤';
		} else if (num == 1) {
			return '正常';
		} else if (num == -1) {
			return '学员迟到';
		}
	}
});
comfilter.filter('status2', function () {//老师的考勤状态
	return function (num) {
		if (num == 0) {
			return '老师缺勤';
		} else if (num == 1) {
			return '正常';
		} else if (num == -1) {
			return '老师迟到';
		}
	}
});

comfilter.filter('weeks', function () {
	return function (date) {
		var weeks = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
		return weeks[new Date(date).getDay()];
	}
})
// 学习记录状态过滤
comfilter.filter('stuList', function () {
	return function (num) {
		if (num == 4 || num == 3) {
			return '已完成';
		} else if (num == 2) {
			return '正在上课';
		} else if (num == 0) {
			return '未开始';
		} else if (num == 1) {
			return '等待上课';
		}
	}
})
// 过滤半小时
comfilter.filter('fateDate', function ($rootScope, $filter) {
	return function (date) {

		var date3 = new Date(date.replace(/-/g, '/')).getTime() - new Date($rootScope._serveTime).getTime();
		var diffSec = date3 / 1000 / 60;

		if (diffSec <= 10 && diffSec > -25) {
			return true;

		} else if (diffSec > 10) {

			return false;

		}
	}
})
//小于半小时
comfilter.filter('fateDateHour', function ($rootScope, $filter) {
	return function (date) {


		var date3 = new Date(date.replace(/-/g, '/')).getTime() - new Date($rootScope.serviceTime).getTime();
		var diffSec = date3 / 1000 / 60;
		console.log(diffSec);
		if (diffSec <= 30 && diffSec >= -25) {
			return true;
		} else {
			return false;
		}
	}
})
//大于两小时
comfilter.filter('fateDateHourTwo', function ($rootScope, $filter) {
	return function (date) {
		var date3 = new Date(date.replace(/-/g, '/')).getTime() - new Date($rootScope.serviceTime).getTime();
		//var diffSec = date3 / 1000 / 60;

		if (date3 > 3600 * 1000 * 2) {
			return true;
		} else {
			return false;
		}
	}
})
comfilter.filter('weekDay', function ($rootScope) {
	return function (date) {
		var weeks = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六', '今日'];
		var day ;
		if (date.indexOf('T')< 0) {
			day = new Date(date.replace(/-/g, '/'));
		}else{
			day = new Date(date.split('T')[0].replace(/-/g, '/'));
		}

		var _day = day.getFullYear() +''+(day.getMonth()+1)+''+day.getDate();

		var now = new Date($rootScope.serviceTime);

		var _nDay = now.getFullYear() +''+(now.getMonth()+1)+''+now.getDate();

		if (_day == _nDay) {
			return weeks['7'];
		} else {
			return weeks[day.getDay()];
		}
	}
})
//过滤当前日期
comfilter.filter('dateDay', function ($rootScope) {
	return function (date) {
		if (date.indexOf('T')< 0) {
			var time=date.slice(date.indexOf('-')+1);
			time=time.split('-');
			return time[0] + '月' + time[1] + '日';
		} else {
			var d = date.split('T')[0];
			var date = d.split('-')[1] + '月' + d.split('-')[2] + '日';
			return date;
		}

	}
})
//获得小时
comfilter.filter('getHours', function ($rootScope, $filter) {
	return function (date) {
		if (new Date(date).getMinutes() == 0) {
			return new Date(date).getHours() + ":" + "00"
		} else {
			return new Date(date).getHours() + ":" + new Date(date).getMinutes()
		}
	}
})
//获得月份
comfilter.filter('getMonths', function ($rootScope, $filter) {
	return function (date) {
		return new Date(date).getMonth() + 1
	}
})
//获得当前天数
comfilter.filter('getDates', function ($rootScope, $filter) {
	return function (date) {
		return new Date(date).getDate()
	}
})
// 课程第几节
comfilter.filter('pageIndex', function () {
	return function (num) {
		return num + 1;
	}
})
// 等级状态
comfilter.filter('levelStatus', function () {
	return function (level) {
		if (level == 0) {
			return '预备级1'
		} else if (level == -1) {
			return '预备级2'
		} else {
			return level;
		}
	}
})
//收藏
comfilter.filter('fiiterNum', function () {
	return function (data) {
		if (data == '1') {
			return '已  约'
		} else if (data == '0') {
			return '可预约'
		} else {
			return '';
		}
	}
})
// 关注
comfilter.filter('isGuanZhu', function () {
	return function (data) {
		if (data == 1) {
			return '已关注'
		} else if (data == 0) {
			return '关注'
		} else {
			return '';
		}
	}
})
// 年龄
comfilter.filter('getAge', function ($rootScope) {
	return function (data) {
		var serverTime = $rootScope.serviceTime;
		function getAge(t, s) {
			var sTime = new Date(s);
			var tTime = new Date(t);
			return (sTime.getFullYear() - tTime.getFullYear() + 1) + '岁';
		}


		// return  getAge(data,serverTime) == NaN ? '' : getAge(data,serverTime);
		return getAge(data, serverTime) == 'NaN岁' ? '--' : getAge(data, serverTime);
	}
})
//过滤百分比
comfilter.filter('percentage',function(){
	return function(num){
		return (Math.round(num / 100 * 10000) / 100.00 + "%");// 小数点后两位百分比
	}
})