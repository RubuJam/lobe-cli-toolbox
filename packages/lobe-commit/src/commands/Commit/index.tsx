import { Alert } from '@inkjs/ui';
import fs from 'node:fs';
import { memo } from 'react';
import { shallow } from 'zustand/shallow';

import { HOOK } from '@/commands/Hook/HookCreate';
import { useCommitStore } from '@/store/commitStore';
import getAbsoluteHooksPath from '@/utils/getAbsoluteHooksPath';

import AiCommit from './AiCommit';
import InputIssues from './InputIssues';
import InputScope from './InputScope';
import InputSubject from './InputSubject';
import InputType from './InputType';
import RunGitCommit from './RunGitCommit';

const hookFile = getAbsoluteHooksPath(HOOK.FILENAME);
const hasHookFile = fs.existsSync(hookFile);
interface CommitProps {
  hook?: boolean;
}

const Commit = memo<CommitProps>(({ hook }) => {
  const { step } = useCommitStore(
    (st) => ({
      step: st.step,
    }),
    shallow,
  );

  if (!hook && hasHookFile) {
    return (
      <Alert variant="warning">{`Lobe Commit is in hook mode, use "git commit" instead.`}</Alert>
    );
  }

  if (step === 'commit') return <RunGitCommit hook={hook} />;
  if (step === 'ai') return <AiCommit />;
  return (
    <>
      <InputType show={step === 'feat'} />
      <InputScope show={step === 'scope'} />
      <InputSubject show={step === 'subject'} />
      <InputIssues show={step === 'issues'} />
    </>
  );
});

export default Commit;
