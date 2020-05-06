import app from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import 'firebase/storage';

// const config = {
//     apiKey: "AIzaSyDeZSUEgf7anW2XMgUMOgiHLC0-T6Coszc",
//     authDomain: "home-b0086.firebaseapp.com",
//     databaseURL: "https://home-b0086.firebaseio.com",
//     projectId: "home-b0086",
//     storageBucket: "home-b0086.appspot.com",
//     messagingSenderId: "636398865715",
//     appId: "1:636398865715:web:7839c1607e02af2a710246",
//     measurementId: "G-0LEKDYRN86"
// };

const config = {
    apiKey: "AIzaSyDk0Am6aHFhVRM_kJPy2N7-RBSrce8LhgA",
    authDomain: "inmuebles-1df7e.firebaseapp.com",
    databaseURL: "https://inmuebles-1df7e.firebaseio.com",
    projectId: "inmuebles-1df7e",
    storageBucket: "inmuebles-1df7e.appspot.com",
    messagingSenderId: "665903911314",
    appId: "1:665903911314:web:2fd8ebc654e52f75e7314b",
    measurementId: "G-GTHBMM0M7L"
  };




class Firebase{
    
    constructor(){
        app.initializeApp(config);
        this.db = app.firestore();
        this.auth = app.auth();
        this.storage = app.storage();
        this.authorization = app.auth;

        this.storage.ref().constructor.prototype.guardarDocumentos = function(documentos){
            var ref=this;
            return Promise.all(documentos.map(function(file){
                return ref.child(file.alias).put(file).then(snapshot =>{
                    return ref.child(file.alias).getDownloadURL();
                })
            }))
        }

    }

    estaIniciado() {
        return new Promise(resolve => {
            this.auth.onAuthStateChanged(resolve)
        })
    } 

    guardarDocumento = (nombreDocumento, documento) => this.storage.ref().child(nombreDocumento).put(documento);

    devolverDocumento = (documentoUrl) => this.storage.ref().child(documentoUrl).getDownloadURL();

    guardarDocumentos = (documentos) => this.storage.ref().guardarDocumentos(documentos);

    eliminarDocumento = documento => this.storage.ref().child(documento).delete();

}

export default Firebase;