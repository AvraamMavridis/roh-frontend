function socketIOService() {
    var event;
    var socket;
    function _setup(url) {
        this.socket = io(url);
    }
    function _emit(event, data) {
        this.socket.emit(event, data);
        return false;
    }
    ;
    function _on(event, callback) {
        this.socket.on(event, function (data) {
            callback(data);
        });
        return false;
    }
    return {
        on: _on,
        emit: _emit,
        setup: _setup
    };
}
module.exports = socketIOService;
