import * as React from 'react';
import { connect } from 'react-redux';

import { AccountNotifications } from '../components/account-notifications';
import { AllRead } from '../components/all-read';
import { Oops } from '../components/oops';

interface IProps {
  hasNotifications: boolean;
  accountNotifications: any;
  failed: boolean;
}

export const NotificationsRoute = (props: IProps) => {
  const { accountNotifications, hasNotifications } = props;
  const wrapperClass = 'container-fluid main-container notifications';

  if (props.failed) {
    return <Oops />;
  }

  if (!hasNotifications) {
    return <AllRead />;
  }

  return (
    <div className={wrapperClass + (!hasNotifications ? ' all-read' : '')}>
      {accountNotifications.map((obj, key) => (
        <AccountNotifications
          key={key}
          hostname={obj.get('hostname')}
          notifications={obj.get('notifications').toJS()}
        />
      ))}
    </div>
  );
};

export function mapStateToProps(state) {
  const hasNotifications =
    state.notifications
      .get('response')
      .reduce((memo, acc) => memo + acc.get('notifications').size, 0) > 0;

  return {
    failed: state.notifications.get('failed'),
    accountNotifications: state.notifications.get('response'),
    hasNotifications,
  };
}

export default connect(mapStateToProps, null)(NotificationsRoute);
