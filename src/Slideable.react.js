/* global Dragdealer */
import React from 'react';
import ReactDOM from 'react-dom';
import Text from '../../helpers/Text.helpers';
import { Timeable } from './Timeable.react';
import { WalkoutButton } from './WalkoutButton.react';
import { PauseButton } from './PauseButton.react';
import { ServeButton } from './ServeButton.react';

export class Slideable extends React.Component {

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.dragdealer = new Dragdealer(ReactDOM.findDOMNode(this), {
      steps: 3,
      speed: 0.23,
      x: 0.5,
      dragStopCallback: this.onDragStop.bind(this)
    });
  }

  componentWillUnmount() {
    this.dragdealer.destroy();
    this.dragdealer = undefined;
  }

  render() {
    var classes = 'list-row';

    if (this.state.isLeaving) {
      classes += ' slideable-fade';
    }

    return (
      <div className={classes}>
        <div className="handle" style={{ width: (this.props.windowWidth + this.props.extraWidth) }}>
          <ServeButton onServe={this.onServe.bind(this)} />
          <div className="list-item" style={{ width: this.props.windowWidth }}>
            <Timeable
              time={this.props.customer.arrivalTime}
              serviceId={this.props.customer.serviceQueueId}
              showColours={this.props.showColours}
              isSelfServicing={this.props.customer.isSelfServicing}
              isSelfServicingComplete={this.props.customer.isSelfServicingComplete}
              checkThreshold={this.checkThreshold.bind(this)} />
            <div className="list-data">
              <div className="list-line-1 bp-m-1-2">
                <div className="text-1 capitalise truncate">
                  {Text.formatName(this.props.customer)}
                </div>
                {
                  this.props.customer.icb &&
                  <div className="text-3 secondary truncate">
                    <div className="lozenge">{this.props.customer.icb}</div> {this.props.customer.description}
                  </div>
                }
                {
                !this.props.customer.icb &&
                  <div className="text-3 secondary truncate">{this.props.customer.description}</div>
                }
              </div>
              <div className={"need-" + this.props.customer.serviceQueueId + " text-2 truncate bp-m-1-2"}>
                {this.props.customer.categoryName}
              </div>
              {
                this.props.customer.isSelfServicingComplete &&
                <div className="lozenge done">SELF SERVICE COMPLETE </div>
              }
              {
                this.props.customer.isSelfServicingComplete &&
                <a className="link" style={{marginLeft: '5px'}}>Remove?</a>
              }
            </div>
          </div>
          <div className="button-tray list-item">
            <WalkoutButton
              ref="walkout"
              onWalkout={this.onWalkout.bind(this)} />
            <PauseButton
              play={this.props.play}
              onPause={this.onPause.bind(this)} />
            <button type="button" className="btn-list" onClick={this.onEdit.bind(this)}>
              <span className="icon icon-edit"></span>
              <span className="btn-label">edit</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  /**
   * If slideable comes to rest in
   * the center make sure the walkout
   * confirmation button is reset.
   * @param  {number} x
   */
  onDragStop(x) {
    if (x === 0.5) {
      this.refs.walkout.reset();
    }
  }

  /**
   * This will be called with or without a reason
   * depending on if it is actioned from the
   * list button or its an auto walkout due
   * to a threshold breach.
   * @param  {string} reason
   */
  onWalkout(reason) {
    this.complete((customer) => {
      this.props.onWalkout(customer, reason);
    });
  }

  /**
   * Edit button callback.
   */
  onEdit() {
    this.dragdealer.setValue(0.5, 0);
    setTimeout(() => {
      this.props.showEdit(this.props.customer);
    }, 300);
  }

  /**
   * Pause button callback.
   */
  onPause() {
    this.complete(this.props.onPause);
  }

  /**
   * Serve button callback.
   */
  onServe() {
    this.dragdealer.setValue(0.5, 0);
    setTimeout(() => {
      this.props.onListServe(this.props.customer);
    }, 300);
  }

  /**
   * Reset slideable, fade it out and then
   * trigger the callback.
   * @param  {function} callback
   */
  complete(callback) {
    this.dragdealer.setValue(0.5, 0);
    this.setState({
      isLeaving: true
    }, () => {
      setTimeout(() => { callback(this.props.customer); }, 1500);
    });
  }

  /**
   * Call through the parent function
   * to check if threshold is breached.
   * This will not exist for the paused list
   * indicated by absense of the prop.
   * @param  {number} timeDiff
   */
  checkThreshold(timeDiff) {
    if (this.props.checkThreshold && this.props.checkThreshold(timeDiff)) {
      this.onWalkout('wait time exceeded max threshold');
    }
  }

}