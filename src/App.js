import {Component} from 'react'
import {v4} from 'uuid'
import './App.css'

const colorList = ['yellow', 'brown', 'green', 'orange', 'blue']

class App extends Component {
  state = {
    isTrue: false,
    latestList: [],
    isShow: false,
    website: '',
    username: '',
    password: '',
  }

  listenWebsite = e => {
    this.setState({website: e.target.value})
  }

  listenUsername = e => {
    this.setState({username: e.target.value})
  }

  listenPassword = e => {
    this.setState({password: e.target.value})
  }

  addContent = e => {
    e.preventDefault()
    const {username, website, password} = this.state
    const initial = website.slice(0, 1).toUpperCase()
    const classValue = colorList[Math.floor(Math.random() * 5)]
    const newValue = {
      id: v4(),
      initialValue: initial,
      websiteName: website,
      userName: username,
      Password: password,
      classAdd: classValue,
    }
    this.setState(prevState => ({
      latestList: [...prevState.latestList, newValue],
      website: '',
      username: '',
      password: '',
      isTrue: true,
      searchInput: '',
    }))
  }

  showPassword = e => {
    if (e.target.checked) {
      this.setState({isShow: true})
    } else {
      this.setState({isShow: false})
    }
  }

  searchResult = e => {
    this.setState({searchInput: e.target.value})
  }

  deleteId = id => {
    const {latestList} = this.state
    const newList = latestList.filter(eachValue => eachValue.id !== id)
    const caseOf = newList.length !== 0
    this.setState({latestList: newList, isTrue: caseOf})
  }

  render() {
    const {
      website,
      username,
      password,
      isShow,
      latestList,
      searchInput,
    } = this.state
    let {isTrue} = this.state
    const newList = latestList.filter(eachValue =>
      eachValue.websiteName.toLowerCase().includes(searchInput.toLowerCase()),
    )
    if (newList.length === 0) {
      isTrue = false
    } else {
      isTrue = true
    }
    if (website.value === '') {
      alert('Enter Valid Input')
    }

    return (
      <div className="center-className">
        <div>
          <img
            className="password-manager-logo"
            src="https://assets.ccbp.in/frontend/react-js/password-manager-logo-img.png"
            alt="app logo"
          />
        </div>
        <div className="password-manager-input">
          <form onSubmit={this.addContent}>
            <div className="input-card-container">
              <h1 className="password-manager-title">Add New Password</h1>
              <div>
                <div className="password-input-item">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-website-img.png"
                    alt="website"
                    className="input-icons"
                  />
                  <input
                    type="text"
                    onChange={this.listenWebsite}
                    value={website}
                    className="input-item"
                    placeholder="Enter Website"
                  />
                </div>
                <div className="password-input-item">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-username-img.png"
                    alt="username"
                    className="input-icons"
                  />
                  <input
                    type="text"
                    onChange={this.listenUsername}
                    value={username}
                    className="input-item"
                    placeholder="Enter Username"
                  />
                </div>
                <div className="password-input-item">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/password-manager-password-img.png"
                    alt="password"
                    className="input-icons"
                  />
                  <input
                    type="password"
                    onChange={this.listenPassword}
                    value={password}
                    className="input-item"
                    placeholder="Enter Password"
                  />
                </div>
              </div>
              <div className="button-element">
                <button type="submit" className="add-button">
                  Add
                </button>
              </div>
            </div>
          </form>

          <div className="image-password">
            <img
              src="https://assets.ccbp.in/frontend/react-js/password-manager-lg-img.png"
              alt="password manager"
              className="password-image"
            />
          </div>
        </div>
        <div className="password-history-card">
          <div className="top-card-password">
            <div className="center-head">
              <h1 className="your-password-heading">Your passwords</h1>
              <p className="span-element">{newList.length}</p>
            </div>
            <div className="password-input-item">
              <img
                src="https://assets.ccbp.in/frontend/react-js/password-manager-search-img.png"
                alt="search"
                className="input-icon"
              />
              <input
                type="search"
                className="input-items"
                placeholder="search"
                onChange={this.searchResult}
                value={searchInput}
              />
            </div>
          </div>
          <hr className="horizontal-line" />
          <div className="show-password">
            <input id="check" onChange={this.showPassword} type="checkbox" />
            <label htmlFor="check" className="label-password">
              {' '}
              Show Passwords
            </label>
          </div>
          {!isTrue && (
            <div className="empty-password">
              <img
                src="https://assets.ccbp.in/frontend/react-js/no-passwords-img.png"
                alt="no passwords"
                className="no-password"
              />
              <p className="your-password-heading">No Passwords</p>
            </div>
          )}
          {isTrue && (
            <ul className="unorder-list">
              {newList.map(eachValue => (
                <li className="list-item" id={eachValue.id} key={eachValue.id}>
                  <p className={`initial ${eachValue.classAdd}`}>
                    {eachValue.initialValue}
                  </p>
                  <div>
                    <p className="heading">{eachValue.websiteName}</p>
                    <p className="username-tab">{eachValue.userName}</p>
                    {!isShow && (
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-stars-img.png"
                        alt="stars"
                        className="icon-star"
                      />
                    )}
                    {isShow && <p className="heading">{eachValue.Password}</p>}
                  </div>
                  <div className="button-container">
                    <button
                      type="button"
                      className="delete-button"
                      onClick={() => this.deleteId(eachValue.id)}
                      data-testid="delete"
                    >
                      <img
                        src="https://assets.ccbp.in/frontend/react-js/password-manager-delete-img.png"
                        alt="delete"
                        className="delete-icon"
                      />
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    )
  }
}

export default App
