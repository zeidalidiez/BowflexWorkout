import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import AddFolder from '../AddFolder/AddFolder';
import CircleButton from '../CircleButton/CircleButton'
import ApiContext from '../ApiContext'
import { countNotesForFolder } from '../notes-helpers'
import './NoteListNav.css'

export default class NoteListNav extends React.Component {
  state = {
    add: false,
  };

  static contextType = ApiContext;

  handleAddFolder = () => {
    this.setState({ add: !this.state.add })
    this.forceUpdate()
  };
  render() {
    const { folders = [], notes = [] } = this.context
    return (
      <div className='NoteListNav'>
        <ul className='NoteListNav__list'>
          {folders.map(folder =>
            <li key={folder.id}>
              <NavLink
                className='NoteListNav__folder-link'
                to={`/folder/${folder.id}`}
              >
                <span className='NoteListNav__num-notes'>
                  {countNotesForFolder(notes, folder.id)}
                </span>
                {folder.foldername}
              </NavLink>
            </li>
          )}
        </ul>
        <div className='NoteListNav__button-wrapper'>
          <CircleButton
            tag={Link}
            to='/add-folder'
            type='button'
            className='NoteListNav__add-folder-button'
            onClick={() => this.handleAddFolder()}
          >
            <FontAwesomeIcon icon='plus' />
            <br />
            Folder
          </CircleButton>
          {this.state.add && <AddFolder handleAdd={this.handleAddFolder} />}
        </div>
      </div>
    )
  }
}