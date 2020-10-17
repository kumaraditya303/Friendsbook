import React, { Component } from 'react';
import { Remarkable } from 'remarkable';
import { POST_CREATE_URL } from '../../constants';
import axios from '../../utils/axios';
import style from './style.scss';

class Editor extends Component {
	constructor(props) {
		super(props);
		this.md = new Remarkable();
		this.state = {
			files: [],
			value: 'Hello, **World**!',
		};
	}
	handleChange = (event) => {
		this.setState({ value: event.target.value });
	};

	getMarkup = () => {
		return { __html: this.md.render(this.state.value) };
	};
	handleSubmit = (event) => {
		event.preventDefault();

		let body = new FormData();
		let count = 0;
		for (let file of this.state.files) {
			body.append(`image${++count}`, file);
		}
		body.append('content', this.md.render(this.state.value));

		axios
			.post(POST_CREATE_URL, body, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			})
			.catch((error) => console.log(error));
	};

	handleFileChange = (event) => {
		event.preventDefault();
		this.setState({ files: [...event.target.files] }, () => {
			console.log(this.state);
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
					<input
						type="file"
						name="images"
						multiple
						onChange={this.handleFileChange}
					/>
					<div
						className="markdown-output"
						dangerouslySetInnerHTML={this.getMarkup()}
					></div>
					<input type="submit" value="Submit" />
				</form>

				<div
					id="carouselExampleControls"
					className={`carousel slide ${style.carousel}`}
					data-ride="carousel"
				>
					<div className="carousel-inner">
						{this.state.files.map((file) => (
							<div
								className={
									this.state.files[0].name === file.name
										? 'carousel-item active'
										: 'carousel-item'
								}
								key={file.name}
							>
								<img
									key={file.name}
									src={URL.createObjectURL(file)}
									alt="..."
									className="d-block w-100"
								/>
							</div>
						))}
					</div>
					<a
						className="carousel-control-prev"
						href="#carouselExampleControls"
						role="button"
						data-slide="prev"
					>
						<span
							className="carousel-control-prev-icon"
							aria-hidden="true"
						></span>
						<span className="sr-only">Previous</span>
					</a>
					<a
						className="carousel-control-next"
						href="#carouselExampleControls"
						role="button"
						data-slide="next"
					>
						<span
							className="carousel-control-next-icon"
							aria-hidden="true"
						></span>
						<span className="sr-only">Next</span>
					</a>
				</div>
			</div>
		);
	}
}

export default Editor;
