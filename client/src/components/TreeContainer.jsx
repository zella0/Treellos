import React, { Component } from 'react';
import { connect } from 'react-redux';

import Tree from 'react-d3-tree';

import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

// redux dependencies
import { fetchBranch } from '../redux/actions/branchesActions';
import { fetchLeafs } from '../redux/actions/leafsActions';

// components dependencies
import TodoContainer from './TodoContainer';

class TreeContainer extends Component {
  componentDidMount(){
    this.props.fetchLeafs();

  }

  // componentDidUpdate(){
    // let tree_id = this.props.branches[0].tree_pid;
    // this.props.fetchBranch(tree_id)
  // }
  
  render() {
    let leafs = this.props.leafs;

    
    const treeData = this.props.branches;
    if (!this.props.branches) {
      return <div>Loading...</div>
    } else if(this.props.leafs){
       let highestLeafLength = () => {
        let obj = {}
        if(!this.props.leafs.length){
          return 1;
        }
        for (let leaf of leafs) {
          if (obj[leaf.branch_pid]) {
            obj[leaf.branch_pid]++
          } else {
            obj[leaf.branch_pid] = 1;
          }
        }
        let result = obj[Object.keys(obj).reduce((highest, current) => obj[highest] > obj[current] ? highest : current)];
    
          return result;
        
      }
      // console.log(highestLeafLength)
      const { classes } = this.props;
      return (
        <React.Fragment>
          <div className={classes.root}>
            <Grid container spacing={24}>
              <Grid item xs={12}>
                <Paper className={classes.paper}>
                  <Tree
                    data={treeData}
                    zoom={0.5}
                    scaleExtent={{ min: 0.1, max: 3 }}
                    nodeSvgShape={{ shape: "none" }}
                    orientation="vertical"
                    translate={{ x: window.innerWidth / 2, y: 50 }}
                    allowForeignObjects
                    separation={{ siblings: 3, nonSiblings: 2 }}
                    nodeSize={{ x: 180, y: highestLeafLength() * 100}}
                    nodeLabelComponent={{
                      render: <TodoContainer />,
                      foreignObjectWrapper: {
                        style: {
                          x: -125,
                          y: -90
                        },
                      }
                    }}
                  />
                </Paper>
              </Grid>
            </Grid>
          </div>
        </React.Fragment>
      );
    }
  }
}

const styles = theme => ({
  root: {
    flexGrow: 1
  },
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    height: '100vh',
    backgroundColor: 'grey'

  },
});

TreeContainer.propTypes = {
  classes: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
  branches: state.branches,
  leafs: state.leafs
})

const mapDispatchToProps = {
  fetchBranch,
  fetchLeafs
}


export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(TreeContainer));