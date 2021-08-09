import React from 'react';
import RouterPageUser from '../../../routers/routerPageUser';


function UserPage({ account_current }) {
  return (
    <div>
      <RouterPageUser account_current={account_current} />
    </div>
  );
}

export default UserPage;