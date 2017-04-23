Vue.use(VueMaterial);
var QrCode = new Vue({
    el: "#qr-code",
    data: {
        acceptCode: null,
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
        returnCode(){
            return this.acceptCode;
        }
    },
    created: function () {
//        this.qrScan();
    }
});


document.addEventListener("deviceready", onDeviceReady, false);

function onDeviceReady() {

   var audio = new Audio(); // Создаём новый элемент Audio
   audio.src = 'audio/qr.mp3'; // Указываем путь к звуку "клика"

    function qrScanJ(){
        // For the best user experience, make sure the user is ready to give your app
        // camera access before you show the prompt. On iOS, you only get one chance.

        QRScanner.prepare(onDone); // show the prompt

        function onDone(err, status){
          if (err)
          {
              // here we can handle errors and clean up any loose ends.
              alert(err);
          }
          if (status.authorized)
          {
              // alert("authorized");
              // W00t, you have camera access and the scanner is initialized.
              // QRscanner.show() should feel very fast.
              QRScanner.show();
              QRScanner.scan(displayContents);

              function displayContents(err, code)
              {
                  if (err) {
                      alert("error scan");
                      // an error occurred, or the scan was canceled (error code `6`)
                  } else {
        //                                      alert(code);
//                      soundQR();

                      audio.play(); // Автоматически запускаем


                      var dialgAnswer = confirm("Использовать код?");
//                        var test = confirm("asdsad");

//                        var answer = QrCode.openDialog('qr-accept');

                        if(dialgAnswer){
                            alert("Код успешно принят");
                        //                                QrCode.acceptCode = null;
                            console.log(code);
                            setTimeout(function() { QRScanner.scan(displayContents) }, 2100);
                        }else{
                        //                                QrCode.acceptCode = null;
                            setTimeout(function() { QRScanner.scan(displayContents) }, 2100);
                        }



                      // The scan completed, display the contents of the QR code:
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

    qrScanJ();

}








