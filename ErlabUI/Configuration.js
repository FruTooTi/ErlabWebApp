(function () {
    this.Configuration = {};
    // Sonradan Eklendi
    this.Configuration.ConfigureDocumentEventListeners = function ConfigureDocumentEventListeners() {
        var infoPanel = document.getElementById('infoBase');
        infoPanel.addEventListener('click', function (e) {
            if (e.target.id == "infoBase") {
                App.Display.Clear.InfoBase();
            }
        });
        document.addEventListener('keydown', function (e) {
            App.Navigator.Run(e);
        });
    }
}).apply(App)