function getUserHome() {
  return process.env[process.platform == 'win32' ? 'USERPROFILE' : 'HOME'] as string;
}

export default getUserHome;
