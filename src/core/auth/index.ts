export * from './Account';
export * from './BaseAccount';
export * from './BaseVestingAccount';
export * from './ContinuousVestingAccount';
export * from './DelayedVestingAccount';
export * from './PeriodicVestingAccount';
export * from './EvmAccount';

// TODO : check whether used or not
// export function isVesting(
//   account: Account
// ): account is LazyGradedVestingAccount {
//   return account instanceof LazyGradedVestingAccount;
// }
