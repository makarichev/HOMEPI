module.exports = function (unit) {

    //конфигурация
    unit.io.of("/config").on("connection", function (client) {

        client.on("get", function () {
            client.emit("config", _this.config);
        })

        client.on("save", function (newConfig) {
            _this.config = newConfig;
            _this.configurator.save()
            client.emit("config", _this.config);
        })

    })





}