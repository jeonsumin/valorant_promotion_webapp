import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { CheckboxField } from './CheckboxField';
import { PersonalInfoAlert } from './PersonalInfoAlert';
import terms from 'data/terms_data';

type FormValues = {
  nick_name: string;
  phone1: string;
  phone2: string;
  phone3: string;
  user_ph: string;
  terms1: boolean;
  terms2: boolean;
  allChecked: boolean;
};

type CheckInFormProps = {
  onSubmit: (data: FormValues) => void;
};

export function CheckInForm({ onSubmit }: CheckInFormProps) {
  const { control, register, watch, setValue, handleSubmit } =
    useForm<FormValues>({
      defaultValues: {
        nick_name: '',
        phone1: '',
        phone2: '',
        phone3: '',
      },
    });

  const personalInfo = watch('terms1');
  const dataUsage = watch('terms2');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState<any>({});

  useEffect(() => {
    setValue('allChecked', personalInfo && dataUsage);
  }, [personalInfo, dataUsage, setValue]);

  const handleAllCheck = (isChecked: boolean) => {
    setValue('terms1', isChecked);
    setValue('terms2', isChecked);
    setValue('allChecked', isChecked);
  };

  const handleIndividualCheck = (name: any, isChecked: boolean) => {
    setValue(name, isChecked);
  };

  const allFieldsFilled = (): boolean => {
    const values = watch();
    const { nick_name, phone1, phone2, phone3 } = values;

    return (
      nick_name.trim() !== '' &&
      phone1.trim() !== '' &&
      phone2.trim() !== '' &&
      phone3.trim() !== '' &&
      personalInfo &&
      dataUsage
    );
  };

  const showModal = (type: number) => {
    setModalType(terms[type]);
    setIsModalOpen(true);
  };

  return (
    <>
      <form className='form round_box' onSubmit={handleSubmit(onSubmit)}>
        <div className='input_row'>
          <label htmlFor='nick_name'>닉네임</label>
          <div className='input_wrap'>
            <Controller
              name='nick_name'
              control={control}
              render={({ field }) => (
                <input
                  type='text'
                  placeholder='최대 8자 입력 가능합니다.'
                  maxLength={8}
                  {...field}
                />
              )}
            />
          </div>
        </div>

        <div className='input_row'>
          <label htmlFor='phone'>연락처</label>
          <div className='input_wrap'>
            <Controller
              key='phone1'
              name='phone1'
              control={control}
              render={({ field }) => (
                <input
                  type='tel'
                  placeholder={'010'}
                  maxLength={3}
                  {...field}
                  value={typeof field.value === 'string' ? field.value : ''}
                />
              )}
            />
            -
            <Controller
              key='phone2'
              name='phone2'
              control={control}
              render={({ field }) => (
                <input
                  type='tel'
                  placeholder={'1234'}
                  maxLength={4}
                  {...field}
                  value={typeof field.value === 'string' ? field.value : ''}
                />
              )}
            />
            -
            <Controller
              key='phone3'
              name='phone3'
              control={control}
              render={({ field }) => (
                <input
                  type='tel'
                  placeholder={'5678'}
                  maxLength={4}
                  {...field}
                  value={typeof field.value === 'string' ? field.value : ''}
                />
              )}
            />
          </div>
        </div>

        <div className='input_row'>
          <div className='terms_bd'>
            <CheckboxField
              label='전체 동의'
              checked={watch('allChecked')}
              onChange={(e) => handleAllCheck(e.target.checked)}
            />
            {terms.map((terms: any, index: number) => (
              <CheckboxField
                key={`terms_${index}`}
                label={`${terms.title}(필수)`}
                checked={terms.id == 1 ? personalInfo : dataUsage}
                onChange={(e) =>
                  handleIndividualCheck(`terms${terms.id}`, e.target.checked)
                }
                onLabelClick={(e) => {
                  showModal(index);
                  handleIndividualCheck(`terms${terms.id}`, true);
                }}
              />
            ))}
          </div>
        </div>

        <button
          type='submit'
          className='submit_btn'
          disabled={!allFieldsFilled()}
        >
          플레이하기
        </button>
      </form>
      <PersonalInfoAlert
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        terms={modalType}
      />
    </>
  );
}
