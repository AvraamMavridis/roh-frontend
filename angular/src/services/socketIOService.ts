declare var io:any;

function socketIOService(){
  var event: string;
  var socket:any;

  function _setup(url: string){
    this.socket = io(url);
  }

  function _emit(event:string, data:any){
    this.socket.emit(event, data);
    return false;
  };

  function _on(event:string, callback:any){
    this.socket.on(event, function(data){
      callback(data);
    });
    return false;
  }

  return {
    on: _on,
    emit: _emit,
    setup: _setup
  }
}

export = socketIOService;
