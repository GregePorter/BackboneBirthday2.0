(function($){

//month model
    var Month = Backbone.Model.extend({
        defaults : function () {
	    return {
                name : "",
                number  : 0,	
                selected : false,
            }
        },
    });

//Month view 
    var MonthView = Backbone.View.extend({
        tagName : "div", 
        id  : "month",
        events : {
            "click" : "select"
        },	
        initialize: function() {
            this.listenToOnce(this.model, 'change', this.render);
        },
	select : function(e) {
            this.model.set({"selected" : true});
        },
        render: function () {
            if (this.model.get("selected")) {
                this.$el.html(this.model.get('name')).css({color : "red"});
            } else {
                this.$el.html(this.model.get('name'));
            }
            return this;
        }
    });

//The Year collection is a collection of Months. It has a custom comparator for sorting by number.
    var Year = Backbone.Collection.extend({
        model : Month,
        comparator : function (model) {
            return model.get("number");
        }
    });

    var jan = new Month({
        name : "January",
        number : 1,
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

    var months = new Year;

    months.add(jan);
    months.add(feb);
    months.add(mar);
    months.add(apr);
    months.add(may);
    months.add(jun);
    months.add(jul);
    months.add(aug);
    months.add(sep);
    months.add(oct);
    months.add(nov);
    months.add(dec);

//birthdayMonth API, the user clicking functionality is linked to the AppView's events instead of having them directly here too
    var birthdayMonth = (function () {
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
    })();

//AppView is the main view for the application
    window.AppView = Backbone.View.extend({
        el: $("body"),
        sort : "",

        //The initialize function gets the months from the Year model and renders each of them
        //One way to improve on this would be to make a YearView which would call subviews
	initialize: function() {
		var that = this;
                sort = "number";
		months.each(function (mon) {
			that.addMonth(mon);
		});
	},
       
        //AppView listens to clicks from the buttons which sort the months and clicks to the month div
        events : {
            "click #numButton" : "byNumber",
            "click #nameButton" : "byName",
            "click #month" : "changeMonth"
        },

        //changeMonth updates the birthdayMonth API with the current month and it triggers the view to re-render the months 
        changeMonth : function (e) {
            birthdayMonth.setMonth($(e.currentTarget)[0].innerHTML);
            if (sort === "number") {
                this.byNumber(); 
            } else {
                this.byName();
            }
        },
        //this sorts the months based on the Collections default comparator (Number) and then re-renders
        byNumber : function () {
            var that = this;
            sort = "number";
            months.sort();
            months.each(function (mon) {
                $("#month").remove();
                $("#month").unbind();
                that.addMonth(mon);
            });
        },
        //this sorts the months with a custom sorting function (by Name) and then renders the view based on the resultant list
        byName : function () {
            var that = this;
            sort = "name";
            var sortedList =  months.sortBy( function (mon) {
                return mon.get("name");
            });
            sortedList.forEach( function (mon) {
                $("#month").remove();
                $("#month").unbind();
                that.addMonth(mon);
            }); 
        },
        //this is the render method for AppView. It checks to see if the supplied month is the current month and, if it is, it is colored appropriatly
        addMonth : function (mon) {
            var view = new MonthView({model : mon});
            if (mon.get('name') != birthdayMonth.getMonth()) {
                mon.set({"selected" : false});
            }
            var monthView = view.render().el;
            this.$el.append(monthView);
        }
    });
    var appView = new AppView;
})(jQuery);
