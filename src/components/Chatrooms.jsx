import React from 'react';
import { ChatroomService } from '../models/Chatrooms';

class Chatrooms extends React.Component {

	constructor(props) {
		super(props);

		// set INITIAL state
		this.state = {
			chatrooms: []
		};

		// should print config object to console
		this.roomService = new ChatroomService();
	}


	componentDidMount() {
		this.roomService.receiveInitialChatrooms().then(page => this.setState({ chatrooms: page.data.reverse() }));

		let updateCallback = room => {
			this.setState({
				chatrooms: this.state.chatrooms.concat(room)
			});
		};

		this.roomService.updateChatroom(updateCallback);
	}


	componentDidUpdate() {
		var elem = document.querySelector('#chatrooms-area');
		elem.scrollTop = elem.scrollHeight;
	}


	handleKeyUp(e) {
		let ENTER = 13;
		if( e.keyCode === ENTER ) {
			this.createChatroom(e);
		}
	}


	createChatroom(e) {
		let title = this.refs.add_chatroom.value;
		if (title == null || title === "") {
			e.preventDefault();
			return false;
		}

		this.roomService.makeRoom(title);
		this.refs.add_chatroom.value = "";
		e.preventDefault();
		return false;
	}


	render() {
		console.log("Chatrooms Props: ");
		console.dir(this.props);

		console.log("Chatrooms State: ");
		console.log(this.state.chatrooms);

		var chatrooms = [];
		for (var i = 0; i < this.state.chatrooms.length; i++) {
			chatrooms.push(<div className='chatroom-entry' key={i}
													onClick={(e) => {
														{/*console.log(e.target.classList);*/}
														let ces = document.querySelectorAll(".chatroom-entry");
														ces.forEach((ce) => {
															ce.classList.remove("active");
														});
														e.target.classList.add("active");
													}}>
				{this.state.chatrooms[i].title}
			</div>);
		}

		return (
			<div id="chatrooms-area">
				<input type="text" placeholder="create chatroom" ref="add_chatroom"
							 onKeyUp={(e) => {this.handleKeyUp(e)}} />

				{chatrooms}

			</div>
		);
	}
}

export default Chatrooms;
