import React, { Component } from 'react';


export default class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			peopleCount: null
		}

		this.dict = {
			6: ['预言家', '女巫', '猎人', '白痴', '狼人', '狼人', '平民', '平民', '平民', '平民', '平民', '平民'],
			7: ['预言家', '花蝴蝶', '猎人', '白痴', '狼人', '狼人', '守卫', '平民', '平民', '平民', '平民', '平民', '平民', '平民'],
			8: ['预言家', '女巫', '猎人', '白痴', '狼人', '狼人', '平民', '平民', '平民', '平民', '平民', '平民', '平民', '平民', '狼人', '守卫']
		}

		this.onInputChange = this.onInputChange.bind(this);
		this.renderTable = this.renderTable.bind(this);
		this.renderRows = this.renderRows.bind(this);
		this.shuffle = this.shuffle.bind(this);
	}

	onInputChange(event) {
		this.setState({
			peopleCount: parseInt(event.target.value)
		})
	}

	shuffle(array) {
	  let currentIndex = array.length;
	  let temporaryValue;
	  let randomIndex;

	  // While there remain elements to shuffle...
	  while (0 !== currentIndex) {

	    // Pick a remaining element...
	    randomIndex = Math.floor(Math.random() * currentIndex);
	    currentIndex -= 1;

	    // And swap it with the current element.
	    temporaryValue = array[currentIndex];
	    array[currentIndex] = array[randomIndex];
	    array[randomIndex] = temporaryValue;
	  }

	  return array;
	}

	renderRows(count, shuffleRoles1, shuffleRoles2) {
		let res=[];
		let i;

		for (i=0; i<count; i++) {
			res.push(
				<tr>
					<td>{i}</td>
					<td>{shuffleRoles1[i]}</td>
					<td>{shuffleRoles2[i]}</td>
				</tr>
				)
		}
		return res;
	}

	renderTable() {

		let resTable = null;
		const count = this.state.peopleCount;
		let flag = true;

		if (typeof(count) === 'number' && count > 5 && count < 9) {
			const roles = this.dict[count];
			let shuffleRoles1;
			let shuffleRoles2;
			while(flag) {
				const shuffleRoles = this.shuffle(roles);
				shuffleRoles1 = shuffleRoles.slice(0, count);
				shuffleRoles2 = shuffleRoles.slice(count);
				let i;
				for (i=0;i<count;i++) {
					if(shuffleRoles1[i] === '狼人' && shuffleRoles2[i] === '狼人') {
						flag = true;
						break;
					}
					if((shuffleRoles1[i] === '狼人' && shuffleRoles2[i] === '预言家') || (shuffleRoles2[i] === '狼人' && shuffleRoles1[i] === '预言家')) {
						flag = true;
						break;
					}
				}
				if ( i===count) {
					flag = false;
				}
			}
			resTable = this.renderRows(count, shuffleRoles1, shuffleRoles2);
			
		}
		    		
		return resTable;
	}

	render() {
	return (
		<div>
	        <input
	          placeholder="请输入参与人数(6-8)"
	          className="form-control"
	          value={this.state.term}
	          onChange={this.onInputChange} />
		        
		    <table className="table table-striped">
		    	<thead>
			    	<tr>
			    		<th>编号</th>
			    		<th>职业1</th>
			    		<th>职业2</th>
			    	</tr>
			    </thead>
			    <tbody>
		    		{this.renderTable()}
			    </tbody>
		    </table>
		    
		</div>
	);
	}
}
