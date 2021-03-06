(function($){

//month model
    var Month = Backbone.Model.extend({
        defaults : function () {
	    return {
                name : "",
                number  : 0,	
                selected : false,  //trailing comment
            }
        },
    });

//Month view 
    var MonthView = Backbone.View.extend({
        tagName : "div", 
        //id : "",
        class : "month",
        events : {
            "click" : "select"
        },
	    select : function(e) {
            //this.model.set({"selected" : true});
            birthdayMonth.setMonth(this.model.get('name'));
            this.render();
        },
        render: function () {
            if (this.model.get('name') === birthdayMonth.getMonth()) {
                //this.$el.id(this.model.get('name'));
                this.$el.html(this.model.get('name')).css({color : "#F13737"});
            } else {
                //this.$el.id(this.model.get('name'));
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
            _.bindAll(this, 'initRender', 'addAll', 'addOne', 'renderMonth');
            var wrapperNode = document.createElement("section");
            wrapperNode.setAttribute(this.id);
            this.initRender();
        },
        clicked : function () {
            var selectedMonth = this.collection.where({"name" : birthdayMonth.getMonth()});
            console.log("clicked");     
            this.initRender();
            //this.renderMonth();
            //selectedMonths[0].set({"selected" : false}, {silent : true});
        },
        renderMonth : function () {
            //this.collection.where({"selected" : true})[.set({"selected" : });
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
            var renderNode = document.getElementById(this.id);
            //var monView = new MonthView({model : mon, id: mon.get('year')});
            var monView = new MonthView({model : mon});
            this.$el.append(monView.render().el);
        }
    });

    var jan = new Month({
        name : "January",
        number : 1
    });

    var feb = new Month({
        name : "February",
        number : 2
    });

    var mar = new Month({
        name : "March",
        number : 3
    });

    var apr = new Month({
        name : "April",
        number : 4
    });

    var may = new Month({
        name : "May",
        number : 5
    });

    var jun = new Month({
        name : "June",
        number : 6
    });

    var jul = new Month({
        name : "July",
        number : 7
    });

    var aug = new Month({
        name : "August",
        number : 8
    });

    var sep = new Month({
        name : "September",
        number : 9
    });

    var oct = new Month({
        name : "October",
        number : 10
    });

    var nov = new Month({
        name : "November",
        number : 11
    });

    var dec = new Month({
        name : "December",
        number : 12
    });

    var months = new Year();

//    var yearView = new YearView({collection : months});

    months.add(jan);
    months.add(feb);
    months.add(mar);
    months.add(apr);
    months.add(may);
    months.add(jul);
    months.add(jun);
    months.add(aug);
    months.add(sep);
    months.add(oct);
    months.add(nov);
    months.add(dec);

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
        el: $("#app"),
        template : _.template($('#button-template').html()),
        //The initialize function gets the months from the Year model and renders each of them
        //One way to improve on this would be to make a YearView which would call subviews
    	initialize: function() {
            var wrapperNode = document.createElement("section");
            wrapperNode.setAttribute("id", this.id);
            this.$el.append(wrapperNode);
            this.render();
    	},
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
            if (e.currentTarget.parentNode.id === this.id.toString()) {
                console.log("byNumber");
                this.collection.sortKey = "number";
                this.collection.sort();
                this.render();
            }
        },
        //this sorts the months with a custom sorting function (by Name) and then renders the view based on the resultant list
        byName : function (e) {
            if (e.currentTarget.parentNode.id === this.id.toString()) {
                console.log("byName");
                this.collection.sortKey = "name";
                this.collection.sort();

                this.render();
            }
        },
        //render the App's year
        render: function () {
            var renderNode = document.getElementById(this.id);
            renderNode.innerHTML = this.template();
            var yearView = new YearView({collection : this.collection, id : "month-" + this.id});

            renderNode.appendChild(yearView.initRender().el);
            return this;
        }
    });

    var apps = [];
    var years = [];
    var i;
    for(i = 0; i < 1000; i++) {
        years[i] = months.clone();
        apps[i] = new AppView({collection : years[i], id : (2000-i)});
    }
})(jQuery);
