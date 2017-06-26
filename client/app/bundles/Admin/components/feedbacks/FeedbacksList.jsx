import React from 'react';
import Feedback from './Feedback';
import {Link} from 'react-router-dom';
import {FormattedMessage, injectIntl, intlShape} from 'react-intl';
import {defaultMessages} from '../../../../libs/i18n/default';

class FeedbacksList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      feedbacks: []
    };
    this.handleDeleted = this.handleDeleted.bind(this);
  }

  handleDeleted(id) {
    const {formatMessage} = this.props.intl;

    this.setState({
      feedbacks: this.state.feedbacks.filter(feedback => {
        return feedback.id !== id
      })
    });
    $.growl.notice({message: formatMessage(defaultMessages.adminFeedbacksDeleteSuccess)});
  }

  componentDidMount() {
    $.getJSON('/v1/feedbacks.json', (response) => {
      this.setState({ feedbacks: response.content });
    });
  }

  render() {
    const {formatMessage} = this.props.intl;

    return (
      <div className="row">
        <div className="col-md-12">
          <div className="feedbacks-table-header">
            <h2>{formatMessage(defaultMessages.adminFeedbacksTitle)}</h2>
          </div>
          <div className="table-responsive col-md-12">
            <table className="table table-bordered table-hover table-striped">
              <thead>
                <tr>
                  <th>{formatMessage(defaultMessages.adminFeedbacksName)}</th>
                  <th>{formatMessage(defaultMessages.adminFeedbacksEmail)}</th>
                  <th>{formatMessage(defaultMessages.adminFeedbacksPhone)}</th>
                  <th>{formatMessage(defaultMessages.adminFeedbacksSubject)}</th>
                  <th>{formatMessage(defaultMessages.adminFeedbacksContent)}</th>
                  <th>{formatMessage(defaultMessages.adminFeedbacksDelete)}</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.feedbacks.map(feedback => (
                    <Feedback {...feedback} key={feedback.id} handleDeleted={this.handleDeleted}/>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}

export default injectIntl(FeedbacksList);
