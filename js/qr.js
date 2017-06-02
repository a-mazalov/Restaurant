Vue.use(VueMaterial);
var QrCode = new Vue({
    el: "#qr-code",
    data: {
//        queryPointQR: 'http://workprojectmobile/php/qrCode.php',
//        queryPoint: 'http://restaurant.atservers.net/php/qrCode.php',
        queryPointQR: 'http://workproject/www/php/qrCode.php',
        scaning: true,
//        scaning: false,
        
        requestСomplete: false,
//        requestСomplete: true,
        title: "Проверка кода",
        successCode: false,
        errorCode: false,
        warningCode: false,
        
        snackMessage: ""
    },
    methods: {
        openDialog(ref) {
            this.$refs[ref].open();
            console.log(this.$refs[ref]);
        },
        closeDialog(ref) {
            this.$refs[ref].close();
        },
        onOpen() {
            console.log('Opened');
        },
        onClose(type) {
            console.log('Closed', type);
        },
        test(){
            return this.acceptCode;
        },
        queryCode(code){
//            alert(code);
            let Account = Local.Get("Account");
//            console.log(Account);
//            console.log(Account["ID_user"]);
            let SendData = [ {"ValueCode": code, "ID_account": Account["ID_user"] }];
            
            this.$http.get(this.queryPointQR, {params: SendData }).then(function (response) {
                console.log(response.data);
                let dataResponse = JSON.parse(response.data);
                console.log(dataResponse.status);
                console.log(dataResponse.data);
                console.log(dataResponse.message);
                
                setTimeout(function(){
                    QrCode.requestСomplete = true;
                    if(dataResponse.status){
                        QrCode.successCode = true;
                        QrCode.title = dataResponse.message;
                        Account.Bonus += dataResponse.data;
                        Local.Set("Account",Account);
                    }else{
                        
                        if(dataResponse.data){
                            QrCode.warningCode = true;
                            QrCode.title = dataResponse.message;
                        }else{
                            QrCode.errorCode = true;
                            QrCode.title = dataResponse.message;    
                        }
                        

                    }
                    
                },2000);
                
            
//                console.log(JSON.parse(response.data["success"]));
//                console.log(response.data[1]);
//                console.log(response[0]);
//                console.log(response.data[0]);
//                console.log(JSON.parse(response.data[1]));
                
            }, function (error) {
                console.log("Ошибка запроса QR: ");
            });
        }
    },
    created: function () {
//        this.qrScan();
    }
});


document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {

//    QrCode.queryCode("code12");
    
    
    var audio = new Audio(); // Создаём новый элемент Audio
//   audio.src = 'audio/Elara.mp3'; // Указываем путь к звуку "клика"
    audio.src = 'audio/qr.mp3';

//    var QRScanLocal = QRScanner;
    
    qrScanJ(audio);
}   
    function qrScanJ(audio){
        QRScanner.prepare(onDone); // show the prompt

        function onDone(err, status){
          if (err)
          {
              // here we can handle errors and clean up any loose ends.
              alert(err);
          }
          if (status.authorized)
          {
              QRScanner.show();
              QRScanner.scan(displayContents);

              function displayContents(err, code)
              {
                  if (err) {
                      alert("error scan");
                      // an error occurred, or the scan was canceled (error code `6`)
                  } else {
                      audio.play(); // Автоматически запускаем

                      var dialgAnswer = confirm("Использовать код?");
//                        var test = confirm("asdsad");
                      audio.pause();

                        if(dialgAnswer){
                            QRScanner.hide();
                            QrCode.scaning = false;
                            QrCode.queryCode(code)
//                            alert("Код успешно принят");
                            console.log(code);
                            setTimeout(function() { QRScanner.scan(displayContents) }, 2100);
                        }else{
                        //                                QrCode.acceptCode = null;
                            setTimeout(function() { QRScanner.scan(displayContents) }, 2100);
                        }
                  }
              }

//              alert("scanned");
          }
          else if (status.denied)
          {
              alert("denid");
              // The video preview will remain black, and scanning is disabled. We can
              // try to ask the user to change their mind, but we'll have to send them
              // to their device settings with `QRScanner.openSettings()`.
          }
          else
          {
              alert("else other");
              // we didn't get permission, but we didn't get permanently denied. (On
              // Android, a denial isn't permanent unless the user checks the "Don't
              // ask again" box.) We can ask again at the next relevant opportunity.
          }
        }
    }
    
    function retryScan(){
        QrCode.requestСomplete = false;
        QrCode.scaning = true;
        QrCode.title = "Проверка кода",
        QrCode.successCode = false,
        QrCode.errorCode = false,
        QrCode.warningCode = false,
//        QRScanner.destroy();
        window.QRScanner.show();
//        QRScanner.scan(displayContents);
    }
    












