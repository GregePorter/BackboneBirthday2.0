(function($){

//month model
    var Month = Backbone.Model.extend({
        defaults : function () {
	    return {
                name : "",
                number  : 0,	
                selected : false  //trailing comment
            }
        },
    });

//Month view 
    var MonthView = Backbone.View.extend({
        tagName : "div", 
        class : "month",
        events : {
            "click" : "select"
        },
	    select : function(e) {
            birthdayMonth.setMonth(this.model.get('name'));
            this.render();
        },
        render: function () {
            if (this.model.get('name') === birthdayMonth.getMonth()) {
                this.$el.html(this.model.get('name')).css({color : "#F13737"});
            } else {
                this.$el.html(this.model.get('name'));
            }
            return this;
        }
    });

//The Year collection is a collection of Months. It has a custom comparator for sorting by number.
    var Year = Backbone.Collection.extend({
        model : Month,
        year : 0,
        sortKey : "number",
        comparator : function (model) {
            return model.get(this.sortKey);
        }
    });

//YearView which renders a view of views
    var YearView = Backbone.View.extend({
        template : _.template($('#year-template').html()),
        tagName: "months",
        events : {
            "click" : "clicked"
        },
        initialize : function () {
            _.bindAll(this, 'initRender', 'addAll', 'addOne');
            this.initRender();
        },
        clicked : function () {
            var selectedMonth = this.collection.where({"name" : birthdayMonth.getMonth()});
            console.log("clicked");     
            this.initRender();
        },
        initRender: function() {
            this.$el.html(this.template);
            this.addAll();
            return this;
        },
        addAll: function() {
            this.collection.each(this.addOne);
        },
        addOne: function(mon) {
            var monView = new MonthView({model : mon});
            this.$el.append(monView.render().el);
        }
    });

//birthdayMonth API, the user clicking functionality is linked to the AppView's events instead of having them directly here too
    var birthdayMonth = (function (initMon) {
        var currentMonth = "";
	
        return {
            getMonth : function () {
                return this.currentMonth;
            },
            setMonth : function (name) {
                this.currentMonth = name;
                console.log("User selected " + name + " as the new month");
            }
        };
    })("December");

//AppView is the main view for the application
    var AppView = Backbone.View.extend({
        template : _.template($('#button-template').html()),
        events : {
            "sort" : "sorted"
        },
        sorted : function () {
            console.log("Sorting");
        },
        //AppView listens to clicks from the buttons which sort the months and clicks to the month div
        events : {
            "click #numButton" : "byNumber",
            "click #nameButton" : "byName",
        },
        //this sorts the months based on the Collections default comparator (Number) and then re-renders
        byNumber : function (e) {
                console.log("byNumber");
                this.collection.sortKey = "number";
                this.collection.sort();
                this.render();
        },
        //this sorts the months with a custom sorting function (by Name) and then renders the view based on the resultant list
        byName : function (e) {
                console.log("byName");
                this.collection.sortKey = "name";
                this.collection.sort();
                this.render();
        },
        //render the App's year
        render: function () {
            this.$el.html(this.template);
            var yearView = new YearView({collection : this.collection});

            this.$el.append(yearView.initRender().el);
            return this;
        }
    });

    var mon = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var months = new Year();
    var years = [];
    var yearViews = [];
    var baseElement =  $("#app");
    
    for (var i = 0; i < 12; i += 1) {
        months.add( new Month({ "name" : mon[i], "number" : (i+1)}));
    }

    for (var i = 0; i < 1000; i += 1) {
        years[i] = months.clone();
        yearViews[i] = new AppView({collection : years[i], id : (2014 - i)});
        baseElement.append(yearViews[i].render().el);
    }
})(jQuery);
