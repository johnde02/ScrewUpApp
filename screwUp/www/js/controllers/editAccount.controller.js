
(function () {
    'use strict';

    angular
        .module('screwUpApp')
        .controller('editAccountCtrl', editAccountCtrl);

    editAccountCtrl.$inject = ['$http', '$state', 'budgetService', 'userService'];

    function editAccountCtrl($http, $state, budgetService, userService) {
        var editVM = this;

        editVM.user = userService.getUser();

        editVM.post = {
            "paycheck": "",
            "occurrence": "",
        }



        var clearPost = function () {
            editVM.post.paycheck = "";
            editVM.post.occurrence = "";
        }



        editVM.toOutcome = function () {
            console.log("show me the money!");
            $state.transitionTo('budget-outcome');

        }



        editVM.callToAddBudgetInfo = function () {

            budgetService.findMonthlyNet(editVM.post.paycheck, editVM.post.occurrence);
            editVM.monthlyNet = budgetService.getMonthlyNet();
            console.log("monthlyNet:" + editVM.monthlyNet);

            var url = 'http://localhost:8080/user/' + editVM.user.username;
            $http.post(url, editVM.monthlyNet)

                .then(function (response) {
                    console.log(response);
                }, function (response) {
                    editVM.errorMessage = "This page could not load."

                })
            clearPost();
            editVM.toOutcome();

        }

        editVM.expense = {
            "name": "",
            "cost": ""
        }

        var clearExpense = function () {
            editVM.expense.name = "";
            editVM.expense.cost = "";
        }

        editVM.callToAddExpense = function () {

            budgetService.addExpense(editVM.expense);
            console.log("posted expense:" + editVM.expense.name + editVM.expense.cost);

            var url = 'http://localhost:8080/expense/' + editVM.user.username;
            $http.post(url, editVM.expense)

                .then(function (response) {
                    console.log(editVM.expense);
                    console.log(response.data);
                    console.log(response.data.name + ":" + response.data.cost);
                    clearExpense();
                }, function (response) {
                    editVM.errorMessage = "This page could not load."

                })

        }
    }

    })();

          

 
    
    



