import React from 'react';
import {Chunk} from './Chunk';

export class Diff extends React.Component {
	constructor(props) {
		super(props);

		this.state = { position: 1 };
	}

	render() {
		const model = this.props.model;

		let className = 'diff';
		if(this.state.position > 0) {
			className += ' after-active-diff';
		} else if(this.state.position < 0) {
			className += ' before-active-diff';
		} else {
			className += ' active-diff';
		}

		return <div className={className}>
			<div className="diff-contents" ref={(contents) => this._contents = contents}>
				<div className="diff-compared-files">{model.comparedFiles}</div>
				<div className="diff-mode">{model.mode}</div>
				<div className="diff-file-metadata">{model.fileMetadata}</div>
				<div className="diff-file-a-marker">{model.fileAMarker}</div>
				<div className="diff-file-b-marker">{model.fileBMarker}</div>
				{model.chunks.map(function(chunk, index) {
					return <Chunk model={chunk} key={index}></Chunk>;
				})}
			</div>
		</div>;
	}

	isScrolledToTop() {
		return React.findDOMNode(this._contents).scrollTop === 0;
	}

	isScrolledToBottom() {
		const contents = React.findDOMNode(this._contents);
		return (contents.scrollHeight - contents.clientHeight) === contents.scrollTop;
	}
}