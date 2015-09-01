(function($, undefined) {
    kendo.data.binders.srcPath = kendo.data.Binder.extend( {
        refresh: function() {
            var value = this.bindings["srcPath"].get();

            if (value) {
                $(this.element).attr("src", "content/images/" + value);
            }
        }
    });

    kendo.data.binders.format = kendo.data.Binder.extend( {
        refresh: function() {
            var value = this.bindings["format"].get();

            if (value) {
                $(this.element).text(kendo.toString(value, "c"));
            }
        }
    });

    kendo.data.binders.innerText = kendo.data.Binder.extend( {
        refresh: function() {
            var value = this.bindings["innerText"].get();

            if (value) {
                $(this.element).text("Item added to cart " + value + " times.");
            }
        }
    });

    //viewModel
    var viewModel = kendo.observable({
                                     dataSource: new kendo.data.DataSource({
                                                                           transport: {
                                                                           read: {
                                                                           url: "content/menu.json",
                                                                           dataType: "json" 
                                                                           } 
                                                                           }
                                                                           }),
        added: [],
        currentItem: null,
        addToCart: addToCart,
        removeItem: removeItem,
        checkout: checkout,
        showCheckout: showCheckout,
        showLabel: showLabel,
        showTotal: showTotal,
        showTax:showTax,
        showSum:showSum
    });



    function showMenuView() {
        viewModel.dataSource.filter([]);
        viewModel.dataSource.group({field: "category"});
    } 
    
    function showCartView() {
        viewModel.showCheckout();
    }

    function addToCart(e) {
        var item,
            ordered;

        if(e.data.id) {
            item = e.data     
        } else {
            item = this.get("currentItem");
        }

        ordered = item.get("ordered") || 0;

        ordered += 1;

        item.set("ordered", ordered);

        if (ordered === 1) {
            this.added.push(item);
        }
        

         var cartItems = this.get("added"),
            total = 0;
        for(var idx = 0; idx < cartItems.length; idx++) {
            total += cartItems[idx].ordered ;
        }
        var currentView = app.view();
        var tabstrip = currentView.footer.find(".km-tabstrip").data("kendoMobileTabStrip");
        

        tabstrip.badge(3,total);

        e.preventDefault();
    }

    function removeItem(e) {
        var item = e.data,
            index = viewModel.added.indexOf(item),
            currentView = app.view();

        item.set("ordered", 0);
        viewModel.added.splice(index, 1);

        currentView.scroller.reset();

        var cartItems = this.get("added"),
            total = 0;
        for(var idx = 0; idx < cartItems.length; idx++) {
            total += cartItems[idx].ordered ;
        }
        var currentView = app.view();
        var tabstrip = currentView.footer.find(".km-tabstrip").data("kendoMobileTabStrip");
        
        if(total!=0)
        {
        tabstrip.badge(3,total);
        }
        else
        {
        tabstrip.badge(3,false); 
        }
        e.preventDefault();
    }

    function checkout(e) {
     window.open("mailto:johnson2006wu@gmail.com?subject=New Order - "+document.getElementById('txtname').value+"&body="+document.getElementById('cartemail').innerText);
    }

    function showCheckout(e) {
        var button = $("#checkout");

        if (this.added.length) {
            button.show();
        } else {
            button.hide();
        }
    }
    
    function showLabel() {
        return this.get("currentItem") && this.get("currentItem").get("ordered") > 0;
    }

    function showDetailsView(e) {
        var id = parseInt(e.view.params.id),
            item = viewModel.dataSource.get(id);

        viewModel.set("currentItem", item);
    }

    function showTotal() {
        var cartItems = this.get("added"),
            total = 0;
        for(var idx = 0; idx < cartItems.length; idx++) {
            total += cartItems[idx].ordered * cartItems[idx].price;
        }
        return "Order:"+kendo.toString(total, "c");
    }
    
    function showTax() {
        var cartItems = this.get("added"),
            total = 0;
        for(var idx = 0; idx < cartItems.length; idx++) {
            total += cartItems[idx].ordered * cartItems[idx].price;
        }
        return "Tax: "+kendo.toString(total*0.07, "c");
    }
    
    function showSum() {
        var cartItems = this.get("added"),
            total = 0;
        for(var idx = 0; idx < cartItems.length; idx++) {
            total += cartItems[idx].ordered * cartItems[idx].price;
        }
        return "Total: "+kendo.toString(total*1.07, "c");
    }

    $.extend(window, {
        showMenuView: showMenuView,
        showCartView: showCartView,
        showDetailsView: showDetailsView,
        viewModel: viewModel 
    });
})(jQuery);
