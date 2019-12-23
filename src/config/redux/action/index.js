import firebase from '../../firebase';
// import { database } from '../../firebase';

export const actionUserName = () => {
    return (dispatch) => {
        setTimeout(() => {
            return dispatch({type: 'CHANGE_USER', value: 'Dharmawan'})
        }, 2000)
    }
}

export const registerUserAPI = (data) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch({type: 'CHANGE_LOADING', value: true})
            firebase.auth().createUserWithEmailAndPassword(data.email, data.password)
            .then((result) => {
                console.log('success : ', result);
                dispatch({type: 'CHANGE_LOADING', value: false})
                resolve(true);
            })
            .catch(function(error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode, errorMessage);
                dispatch({type: 'CHANGE_LOADING', value: false})
                reject(false);
            });
        })
    }
}

export const loginUserAPI = (data) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch({type: 'CHANGE_LOADING', value: true})
            firebase.auth().signInWithEmailAndPassword(data.email, data.password)
            .then((result) => {
                console.log('success : ', result);
                const dataUser = {
                    email: result.user.email,
                    uid: result.user.uid,
                    emailVerified: result.user.emailVerified
                }
                dispatch({type: 'CHANGE_LOADING', value: false})
                dispatch({type: 'CHANGE_ISLOGIN', value: true})
                dispatch({type: 'CHANGE_USER', value: dataUser})
                resolve(dataUser)
            })
            .catch(function(error) {
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log(errorCode, errorMessage);
                dispatch({type: 'CHANGE_LOADING', value: false})
                dispatch({type: 'CHANGE_ISLOGIN', value: false})
                reject(false)
            });
        });

    }
}

export const logoutUserAPI = (data) => {
    return (dispatch) => {
        firebase.auth().signOut().then(function() {
            console.log('logout : ', data)
            dispatch({type: 'CHANGE_ISLOGIN', value: false})
          }).catch(function(error) {
            console.log('error : ', error)
          });
    }
}

export const addDataToAPI = (data) => {
    return (dispatch) => {
        firebase.database().ref('notes/' + data.userId).push({
            title: data.title,
            content: data.content,
            date: data.date
          });
    }
}

export const getDataFromAPI = (userId) => (dispatch) => {
    const urlNotes = firebase.database().ref('notes/' + userId);
    return new Promise((resolve, reject) => {
        urlNotes.on('value', function(snapshot) {
            console.log('getData : ', snapshot.val());
            const data = [];
            
            // object.keys untuk merubah object jadi array
            Object.keys(snapshot.val()).map(key => {
                data.push({
                    id: key,
                    data: snapshot.val()[key]
                })
            }) 

            dispatch({type: 'SET_NOTES', value: data})
            resolve(snapshot.val());
          });
    })
}

export const updateDataAPI = (data) => (dispatch) => {
    const urlNotes = firebase.database().ref(`notes/${data.userId}/${data.noteId}`);
    return new Promise((resolve, reject) => {
        urlNotes.set({
            title: data.title,
            content: data.content,
            date: data.date
        }, (err) => {
            if(err) {
                reject(false);
            } else {
                resolve(true);
            }
        });
    })
}

export const deleteDataAPI = (data) => (dispatch) => {
    const urlNotes = firebase.database().ref(`notes/${data.userId}/${data.noteId}`);
    return new Promise((resolve, reject) => {
        urlNotes.remove();
    })
}