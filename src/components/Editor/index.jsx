import React, { Component } from 'react';
import { Remarkable } from 'remarkable';
import axios from '../../store/axios';

class Editor extends Component {
	constructor(props) {
		super(props);
		this.md = new Remarkable();
		this.state = {
			value: 'Hello, **World**!',
		};
	}
	handleChange = (event) => {
		this.setState({ value: event.target.value });
	};

	getMarkup = () => {
		return { __html: this.md.render(this.state.value) };
	};
  handleSubmit = ( event ) =>
  {
    console.log(event.target.files)
		console.log(event);
		event.preventDefault();
		axios
			.post('/api/post/create/', {
				content: this.md.render(this.state.value),
			})
			.then((res) => {
				console.log(res);
			});
	};
	render() {
		return (
			<div className="MarkdownEditor">
				<form onSubmit={this.handleSubmit} method="post">
					<textarea
						className="markdown-content"
						name="content"
						cols="30"
						rows="10"
						defaultValue={this.state.value}
						onChange={this.handleChange}
					></textarea>
					<input type="file" name="images" multiple />
					<div
						className="markdown-output"
						dangerouslySetInnerHTML={this.getMarkup()}
					></div>
					<input type="submit" value="Submit" />
				</form>
			</div>
		);
	}
}

export default Editor;
