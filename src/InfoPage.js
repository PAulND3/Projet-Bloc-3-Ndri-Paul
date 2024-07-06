import React from 'react';

function InfoPage() {
  return (
    <div>
      <main>
        <h2>Information</h2>
        <p>This page displays comprehensive information about the application:</p>
        <ol>
          <strong>Features</strong>
          <p>Code Wallet allows you to manage and organize your code snippets. You can easily add, edit, delete, and view code snippets.</p>
          <strong>Developer Information</strong>
          <p>This application was developed by N'Dri Paul.</p>
          <strong>Legal Information on Data Management</strong>
          <p>Code Wallet complies with data privacy and security standards. Your code snippets are stored securely and are accessible only by you.</p>
        </ol>
      </main>
    </div>
  );
}

export default InfoPage;
