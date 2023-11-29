import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import PageTitle from 'components/common/PageTitle';
import DebugObject from 'components/common/DebugObject';
import LoadingCover from '@george-gillams/components/loading-cover';
import Subsection from '@george-gillams/components/subsection';
import Button from 'components/common/Button';
import { SplitDetailItem } from 'components/common/SplitDetailView';
import { AdminOnly } from 'components/common/Walls';
import { SplitDetailView } from 'components/common/SplitDetailView';
import { setPostLoginRedirect } from 'client-utils/common/storageHelpers';
import Skeleton from './Skeleton';
import { withRouter } from 'next/router';
import UserFilter, { filterUsers, defaultFilters } from './UserFilter';
import { UserEditForm } from 'components/common/Forms';
import ErrorDisplay from 'components/common/ErrorDisplay';
import { BUTTON_TYPES } from '@george-gillams/components/button/constants';

import AdminUsersAPIEntity from './AdminUsersAPIEntity';

import useTabMadeVisible from 'client-utils/common/useTabMadeVisible';
import { ControlPanel, Count } from './admin-users.styles';
import { HStack, VStack } from 'components/common/Stacks';

const AdminUsers = props => {
  const [firstPageHit, setFirstPageHit] = useState(true);
  const [highlightId, setHighlightId] = useState(null);
  const [highlightToScrollTo, setHighlightToScrollTo] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState(defaultFilters);
  const [newUser, setNewUser] = useState({});

  const {
    load,
    remove,
    requestMagicLink,
    update,
    create,

    adminUsersState,
    authenticatorState,

    router,
  } = props;

  const { loadError, users, removing, requesting } = adminUsersState;
  const { user } = authenticatorState;

  useTabMadeVisible(load);

  useEffect(() => {
    load();
  }, []);

  const scrollToHighlightedId = () => {
    if (!highlightToScrollTo) {
      return;
    }

    const scrollToElement = document.getElementById(highlightToScrollTo);
    if (scrollToElement) {
      scrollToElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
      setHighlightToScrollTo(null);
    }
  };

  useEffect(() => {
    if (!router || !router.query || !router.query.highlight) {
      setHighlightId(null);
      setFirstPageHit(false);
      return;
    }

    const highlight = router.query.highlight;
    setHighlightId(highlight);
    if (firstPageHit) {
      setHighlightToScrollTo(highlight);
      setFirstPageHit(false);
    }
  }, [router]);

  useEffect(() => {
    scrollToHighlightedId();
  });

  let filteredUsers = filterUsers(users, filters);

  const showUsers = !!filteredUsers && !!filteredUsers.length && !!filteredUsers.map;

  const newUserForm = (
    <>
      {adminUsersState && <ErrorDisplay message="Error creating user" error={adminUsersState.createError} />}
      <UserEditForm
        showAdminControls
        user={newUser}
        onDataChanged={setNewUser}
        onSubmit={() => {
          create(newUser);
        }}
        submitLabel="Create user"
        loading={adminUsersState.creating}
      />
    </>
  );
  const listView = (
    <VStack>
      <SplitDetailItem scroll={false} highlighted={highlightId === 'new'} href="/admin/users?highlight=new">
        <Subsection name="New +" anchor={false} padding={false} />
      </SplitDetailItem>
      {showUsers &&
        filteredUsers.map(n => (
          <AdminUsersAPIEntity
            key={n.id}
            scroll={false}
            href={`/admin/users?highlight=${n.id}`}
            compact
            entity={n}
            highlighted={highlightId === n.id}
          />
        ))}
    </VStack>
  );
  let detailView = null;
  if (highlightId === 'new') {
    detailView = newUserForm;
  } else {
    const detailUsers = users && users.filter && highlightId ? users.filter(g => g.id === highlightId) : null;
    const detailUser = detailUsers && detailUsers.length > 0 ? detailUsers[0] : null;

    detailView = !detailUser ? null : (
      <AdminUsersAPIEntity
        key={detailUser.id}
        adminUserState={adminUsersState}
        updateUser={update}
        entity={detailUser}
        highlighted={highlightId === detailUser.id}
        onUserUpdateSuccess={() => {
          load();
        }}>
        <ControlPanel>
          <Button
            buttonType={BUTTON_TYPES.destructive}
            loading={requesting || removing}
            onClick={() => {
              requestMagicLink(detailUser);
            }}>
            Login as user
          </Button>
          <Button buttonType={BUTTON_TYPES.destructive} loading={removing} onClick={() => remove(detailUser)}>
            Delete
          </Button>
        </ControlPanel>
      </AdminUsersAPIEntity>
    );
  }

  const filtersApplied = filters !== defaultFilters;
  const mainControls = (
    <HStack>
      <Button loading={adminUsersState.loading} onClick={() => load()}>
        Reload users
      </Button>
      <Button onClick={() => setShowFilters(!showFilters)}>{showFilters ? 'Hide filters' : 'Show filters'}</Button>
      {filtersApplied && <Button onClick={() => setFilters(defaultFilters)}>Clear filters</Button>}
    </HStack>
  );

  const filterControls = <UserFilter filters={filters} onFiltersChanged={setFilters} />;

  return (
    <>
      <LoadingCover
        loadingSkeleton={Skeleton}
        loading={authenticatorState.user === undefined}
        error={authenticatorState.loadAuthError}>
        <AdminOnly
          user={user}
          setLoginRedirect={() => {
            setPostLoginRedirect('admin/users');
          }}>
          <div>
            <PageTitle link={{ to: '/admin', text: 'Admin' }} name="Admin users"></PageTitle>
          </div>
          {mainControls}
          <ErrorDisplay message="Could not load users" error={loadError} />
          {showFilters && filterControls}
          {users && (
            <Count>
              Showing {filteredUsers.length} of {users.length} users
            </Count>
          )}
          <SplitDetailView listView={listView} detailView={detailView} closeLink="/admin/users" />
        </AdminOnly>
      </LoadingCover>
      <DebugObject
        debugTitle="AdminUsers"
        debugObject={{
          load,
          remove,
          requestMagicLink,
          update,
          create,
          adminUsersState,
          authenticatorState,
        }}
      />
    </>
  );
};

AdminUsers.propTypes = {
  load: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired,
  requestMagicLink: PropTypes.func.isRequired,
  update: PropTypes.func.isRequired,
  create: PropTypes.func.isRequired,
  adminUsersState: PropTypes.shape({
    loading: PropTypes.bool,
    loadError: PropTypes.object,
    users: PropTypes.arrayOf(PropTypes.object),
    removing: PropTypes.bool,
    requesting: PropTypes.bool,
    creating: PropTypes.bool,
    updating: PropTypes.bool,
    createError: PropTypes.object,
    updateError: PropTypes.object,
  }).isRequired,
  authenticatorState: PropTypes.shape({
    user: PropTypes.object,
    loadAuthError: PropTypes.object,
  }).isRequired,
  router: PropTypes.shape({
    query: PropTypes.shape({
      highlight: PropTypes.string,
    }).isRequired,
  }),
};

AdminUsers.defaultProps = {
  adminUsersState: null,
  verificationState: null,
  router: null,
};

export default withRouter(AdminUsers);
