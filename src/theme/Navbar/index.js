import React from 'react';
import OriginalNavbar from '@theme-original/Navbar';
import NavProgress from '@site/src/components/NavProgress';

/**
 * 在默认导航栏下追加阅读进度条。
 */
export default function NavbarWrapper(props) {
  return (
    <>
      <OriginalNavbar {...props} />
      <NavProgress />
    </>
  );
}
