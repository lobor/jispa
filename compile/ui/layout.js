var blessed = require('blessed'),
		box = blessed.box({
		  top: 'center',
		  left: 'center',
		  width: '50%',
		  height: '50%',
		  content: 'Hello {bold}world{/bold}!',
		  tags: true,
		  border: {
		    type: 'line'
		  },
		  style: {
		    fg: 'white',
		    bg: 'magenta',
		    border: {
		      fg: '#f0f0f0'
		    },
		    hover: {
		      bg: 'green'
		    }
		  }
		});
module.exports = box;
