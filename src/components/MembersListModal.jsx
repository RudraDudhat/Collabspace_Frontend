import React from 'react';

// Re-using modalStyles from AddMemberModal or define them again if preferred
// For simplicity, let's assume modalStyles are accessible or redefined if this were a larger app
// For this example, I'll copy the necessary base styles.
const commonModalStyles = {
  overlay: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
  },
  content: {
    backgroundColor: 'white',
    padding: '20px 30px',
    borderRadius: '8px',
    boxShadow: '0 5px 15px rgba(0, 0, 0, 0.3)',
    width: '90%',
  },
  title: {
    marginTop: 0,
    marginBottom: '20px',
    fontSize: '1.5rem',
    color: '#333',
  },
  actions: {
    marginTop: '20px',
    display: 'flex',
    justifyContent: 'flex-end',
    gap: '10px',
  },
  buttonSecondary: {
    padding: '10px 15px',
    backgroundColor: '#6c757d',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem',
  },
};

const membersListModalStyles = {
  content: { // Extends commonModalStyles.content
    ...commonModalStyles.content,
    maxWidth: '500px', // Slightly wider for member list
  },
  list: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
    maxHeight: '300px', // Add scroll for long lists
    overflowY: 'auto',
  },
  item: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 0',
    borderBottom: '1px solid #eee',
  },
  // itemLastChild: { // :last-child is tricky with inline styles, often handled by mapping logic
  //   borderBottom: 'none',
  // },
  email: {
    fontSize: '0.95rem',
    color: '#333',
  },
  role: {
    fontSize: '0.85rem',
    padding: '3px 8px',
    borderRadius: '12px',
    fontWeight: 'bold',
  },
  roleOwner: {
    backgroundColor: '#ffc107', // Amber
    color: '#333',
  },
  roleMember: {
    backgroundColor: '#007bff', // Blue
    color: 'white',
  },
};


const MembersListModal = ({ isOpen, onClose, members, ownerId }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div style={commonModalStyles.overlay}>
      <div style={membersListModalStyles.content}>
        <h2 style={commonModalStyles.title}>Team Members</h2>
        {members && members.length > 0 ? (
          <ul style={membersListModalStyles.list}>
            {members.map((member, index) => (
              <li 
                key={member._id || member.email} 
                style={{
                  ...membersListModalStyles.item,
                  borderBottom: index === members.length - 1 ? 'none' : '1px solid #eee' // Handle last child border
                }}
              >
                <span style={membersListModalStyles.email}>{member.email || 'N/A'}</span>
                <span 
                  style={{
                    ...membersListModalStyles.role,
                    ...(member._id === ownerId ? membersListModalStyles.roleOwner : membersListModalStyles.roleMember)
                  }}
                >
                  {member._id === ownerId ? 'Owner' : 'Member'}
                </span>
              </li>
            ))}
          </ul>
        ) : (
          <p>No members in this team yet.</p>
        )}
        <div style={commonModalStyles.actions}>
          <button type="button" style={commonModalStyles.buttonSecondary} onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default MembersListModal;