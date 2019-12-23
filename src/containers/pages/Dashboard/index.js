import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { addDataToAPI, getDataFromAPI, updateDataAPI, deleteDataAPI, logoutUserAPI } from '../../../config/redux/action';
import './Dashboard.css';

class Dashboard extends Component {
    state = {
        title: '',
        content: '',
        date: '',
        textButton: 'SIMPAN',
        noteId: ''
    }

    componentDidMount() {
        const userData = JSON.parse(localStorage.getItem('userData'));
        this.props.getNotes(userData.uid);
    }
    

    handleSaveNotes = () => {
        const {title, content, textButton, noteId } = this.state;
        const { saveNotes, updateNotes } = this.props;
        const userData = JSON.parse(localStorage.getItem('userData'))

        const data = {
            title: title,
            content: content,
            date: new Date().getTime(),
            userId: userData.uid
        }

        console.log('state : ', this.state);
        this.setState({
            title: '',
            content: '',
            date: ''
        })
        
        if(textButton === 'SIMPAN'){
            saveNotes(data);
        } else {
            data.noteId = noteId
            updateNotes(data);
            this.setState({
                title: '',
                content: '',
                textButton: 'SIMPAN'
            })
        }
        console.log(data);
    }

    onInputChange = (e, type) => {
        this.setState({
            [type]: e.target.value
        });
    }

    updateNotes = (note) => {
        console.log(note);
        this.setState({
            title: note.data.title,
            content: note.data.content,
            textButton: 'UPDATE',
            noteId: note.id
        })
    }

    cancleUpdate = () => {
        this.setState({
            title: '',
            content: '',
            textButton: 'SIMPAN'
        })
    }

    deleteNotes = (e, note) => {
        e.stopPropagation();
        const { deleteNotes } = this.props;
        const userData = JSON.parse(localStorage.getItem('userData'))
        const data = {
            userId: userData.uid,
            noteId: note.id,
        }
        deleteNotes(data);
    }

    logout =  (data) => {
        const { history, logoutAccount } = this.props;
        logoutAccount(data);
        localStorage.removeItem('userData');
        history.push('/login');
        // if(res) {
        //     console.log('logout success', res);
        // } else {
        //     console.log('logout failed');
        // }
    }

    render() {
        const {title, content, date, textButton} = this.state;
        const {notes} = this.props;
        const { updateNotes, cancleUpdate, handleSaveNotes, deleteNotes, logout } = this;

        console.log(notes);
        return (
            <div className="container">
                <div className="input-form">
                    <input className="input-title" type="text" placeholder="Title" value={title} onChange={(e) => this.onInputChange(e, 'title')} />
                    <textarea className="input-body" placeholder="body" value={content} onChange={(e) => this.onInputChange(e, 'content')}>

                    </textarea>
                    <div className="action-wrap">
                        <button onClick={handleSaveNotes} className="btn btn-submit">{textButton}</button>
                        {
                            textButton === 'UPDATE' ? (<button  onClick={cancleUpdate} className="btn btn-cancel">CANCEL</button>) : null
                        }
                    </div>
                </div>
                <hr/>
                {
                    notes.length > 0 ? (
                        <Fragment>
                            {
                                notes.map(note => {
                                    return (
                                        <div className="content-field" key={note.id} onClick={() => updateNotes(note)}>
                                            <p className="card-title">{note.data.title}</p>
                                            <p className="date">{note.data.date}</p>
                                            <p className="card-body">{note.data.content}</p>
                                            <div onClick={(e) => deleteNotes(e, note)} className="btn-delete">X</div>
                                        </div> 
                                    )
                                })
                            }
                        </Fragment>
                    ) : null
                }
                <button onClick={(data) => logout(data)} className="btn">LOGOUT</button>
            </div>
        );
    }
}

const reduxState = (state) => ({
    userData: state.user,
    notes: state.notes
})

const reduxDispatch = (dispatch) => ({
    saveNotes: (data) => dispatch(addDataToAPI(data)),
    getNotes: (data) => dispatch(getDataFromAPI(data)),
    updateNotes: (data) => dispatch(updateDataAPI(data)),
    deleteNotes: (data) => dispatch(deleteDataAPI(data)),
    logoutAccount: (data) => dispatch(logoutUserAPI(data))
})

export default connect( reduxState, reduxDispatch)(Dashboard);