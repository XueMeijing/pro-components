import {
  AlipayCircleOutlined,
  TaobaoCircleOutlined,
  UserAddOutlined,
  WeiboCircleOutlined,
} from '@ant-design/icons';
import { LoginForm, LoginFormPage, ProFormText } from '@ant-design/pro-form';
import { act, render } from '@testing-library/react';
import { Alert, Space } from 'antd';
import { waitForComponentToPaint } from '../util';

describe('LoginForm', () => {
  it('📦 LoginForm should show login message correctly', async () => {
    const loginMessage = <Alert type="error" message="登录失败" />;

    const { container } = render(
      <LoginForm message={loginMessage}>
        <ProFormText name="name" />
      </LoginForm>,
    );

    expect(container.querySelectorAll('.ant-alert.ant-alert-error')).toHaveLength(1);
    expect(
      container.querySelector('.ant-alert.ant-alert-error .ant-alert-message'),
    ).toHaveTextContent('登录失败');
  });

  it('📦 LoginForm should render actions correctly', async () => {
    const { container } = render(
      <LoginForm
        actions={
          <Space>
            其他登录方式
            <AlipayCircleOutlined />
            <TaobaoCircleOutlined />
            <WeiboCircleOutlined />
          </Space>
        }
      >
        <ProFormText name="name" />
      </LoginForm>,
    );

    expect(container.querySelectorAll('.ant-pro-form-login-main-other .anticon')).toHaveLength(3);
  });

  it('📦 LoginForm support string logo', async () => {
    const { container } = render(
      <LoginForm logo="https://avatars.githubusercontent.com/u/8186664?v=4">
        <ProFormText name="name" />
      </LoginForm>,
    );

    expect(container.querySelectorAll('.ant-pro-form-login-logo img')).toHaveLength(1);
    expect(container.querySelector('.ant-pro-form-login-logo img')).toHaveAttribute(
      'src',
      'https://avatars.githubusercontent.com/u/8186664?v=4',
    );
  });

  it('📦 LoginForm support react node logo', async () => {
    const { findByTestId } = render(
      <LoginForm
        logo={<img data-testid="test" src="https://avatars.githubusercontent.com/u/8186664?v=4" />}
      >
        <ProFormText name="name" />
      </LoginForm>,
    );

    expect(!!(await findByTestId('test'))).toBeTruthy();
    expect(await findByTestId('test')).toHaveAttribute(
      'src',
      'https://avatars.githubusercontent.com/u/8186664?v=4',
    );
  });

  it('📦 LoginForm support submitter=false', async () => {
    const wrapper = render(
      <LoginForm submitter={false}>
        <ProFormText name="name" />
      </LoginForm>,
    );
    await waitForComponentToPaint(wrapper);

    const dom = await wrapper.queryByText('登 录');

    expect(!!dom).toBeFalsy();
  });

  it('📦 LoginForm support submitter is function', async () => {
    const wrapper = render(
      <LoginForm
        submitter={{
          render: () => <a>登录登录</a>,
        }}
      >
        <ProFormText name="name" />
      </LoginForm>,
    );
    await waitForComponentToPaint(wrapper);

    const dom = await wrapper.queryByText('登录登录');

    expect(!!dom).toBeTruthy();
  });

  it('📦 LoginForm support submitter=false', async () => {
    const fn = jest.fn();
    const wrapper = render(
      <LoginForm
        submitter={{
          onSubmit: () => {
            fn();
          },
        }}
      >
        <ProFormText name="name" />
      </LoginForm>,
    );

    await waitForComponentToPaint(wrapper);
    const dom = await wrapper.findByText('登 录');

    act(() => {
      dom.click();
    });

    expect(fn).toBeCalled();
  });

  it('📦 LoginFormPage support log', async () => {
    const wrapper = render(
      <LoginFormPage
        logo={
          <div>
            <UserAddOutlined />
            logo
          </div>
        }
      >
        <ProFormText name="name" />
      </LoginFormPage>,
    );

    await waitForComponentToPaint(wrapper);
    const dom = await wrapper.findByText('logo');

    expect(!!dom).toBeTruthy();
  });

  it('📦 LoginFormPage support log=false', async () => {
    const wrapper = render(
      <LoginFormPage logo={false}>
        <ProFormText name="name" />
      </LoginFormPage>,
    );

    await waitForComponentToPaint(wrapper);
    const dom = await wrapper.baseElement.querySelector('.ant-pro-form-login-page-header');

    expect(!!dom).toBeFalsy();
  });

  it('📦 LoginFormPage support submitButtonProps', async () => {
    const wrapper = render(
      <LoginForm
        logo={false}
        submitter={{
          submitButtonProps: {
            loading: true,
          },
        }}
      >
        <ProFormText name="name" />
      </LoginForm>,
    );

    await waitForComponentToPaint(wrapper);
    let dom = await wrapper.baseElement.querySelector('.ant-btn-loading');

    expect(!!dom).toBeTruthy();

    dom = await wrapper.baseElement.querySelector('.ant-btn-lg');

    expect(!!dom).toBeTruthy();
  });
});
