import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames/bind';
import { MetaTag, Button } from 'components/index';
import styles from './stylesheet.scss';
import { NutritionApi, ImageApi } from 'api';

const cx = classNames.bind(styles);

const NutrientsDetail = ({ match, history }) => {
  const [nutrient, setNutrient] = useState(null);

  useEffect(
    () =>
      NutritionApi.get(match.params._id).then(({ nutrition }) =>
        setNutrient(nutrition)
      ),
    [match]
  );

  const changeHashTags = (e, i, str) => {
    if (str === 'delete') {
      nutrient.hashtags.splice(i, 1);
    } else if (i) {
      nutrient.hashtags[i] = e.target.value;
    } else {
      nutrient.hashtags.push(null);
    }
    setNutrient({ ...nutrient });
  };

  const updateNutrient = () => {
    return NutritionApi.update(nutrient._id, { ...nutrient }).then(() =>
      history.push('/admin/nutrients')
    );
  };

  return (
    nutrient && (
      <article className={cx('admin__detail')}>
        <MetaTag
          keywords="Ayak,ayak,AYAK,아약,맞춤형추천"
          description="아약 맞춤형 추천 관리자"
          title="아약 맞춤형 추천 관리자"
        />
        <section className={cx('admin__detail--header')}>
          <div className={cx('admin__detail--header--div')}>영양제 정보</div>
        </section>
        <table className={cx('admin__detail--body')}>
          <tbody>
            <tr className={cx('admin__detail--body--tr')}>
              <th className={cx('admin__detail--body--tr--th')}>영양제 이름</th>
              <td className={cx('admin__detail--body--tr--td')}>
                <input
                  type="text"
                  value={nutrient.name}
                  onChange={e =>
                    setNutrient({ ...nutrient, name: e.target.value })
                  }
                  className={cx('admin__detail--body--tr--td--input')}
                />
              </td>
              <th className={cx('admin__detail--body--tr--th')}>영양제 타입</th>
              <td className={cx('admin__detail--body--tr--td')}>
                <input
                  type="text"
                  value={nutrient.type}
                  onChange={e =>
                    setNutrient({ ...nutrient, type: e.target.value })
                  }
                  className={cx('admin__detail--body--tr--td--input')}
                />
              </td>
            </tr>
            <tr className={cx('admin__detail--body--tr')}>
              <th className={cx('admin__detail--body--tr--th')}>영양제 설명</th>
              <td
                colSpan="3"
                className={cx('admin__detail--body--tr--hashtags')}
              >
                <ul className={cx('admin__detail--body--tr--hashtags--ul')}>
                  {nutrient.hashtags.map((hashtag, i) => (
                    <li
                      key={i}
                      className={cx(
                        'admin__detail--body--tr--hashtags--ul--li'
                      )}
                    >
                      <div
                        className={cx(
                          'admin__detail--body--tr--hashtags--ul--li--wrap'
                        )}
                      >
                        <input
                          type="text"
                          value={hashtag}
                          onChange={e => changeHashTags(e, i)}
                          className={cx(
                            'admin__detail--body--tr--hashtags--ul--li--input'
                          )}
                        />
                        <Button
                          className={cx(
                            'admin__detail--body--tr--hashtags--ul--li--btn'
                          )}
                          onClick={e => changeHashTags(e, i, 'delete')}
                        >
                          &#215;
                        </Button>
                      </div>
                    </li>
                  ))}
                  {nutrient.hashtags.length < 4 && (
                    <li
                      className={cx(
                        'admin__detail--body--tr--hashtags--ul--li'
                      )}
                    >
                      <Button
                        className={cx(
                          'admin__detail--body--tr--hashtags--ul--li--btn'
                        )}
                        onClick={e => changeHashTags(e)}
                      >
                        &#43;
                      </Button>
                    </li>
                  )}
                </ul>
              </td>
            </tr>
            <tr className={cx('admin__detail--body--tr')}>
              <th className={cx('admin__detail--body--tr--th')}>대표 이미지</th>
              <td colSpan="3" className={cx('admin__detail--body--tr--td')}>
                <img
                  className={cx('admin__detail--body--tr--td--img')}
                  src={ImageApi.get(nutrient.thumbnailImage._id)}
                  alt={nutrient.name}
                />
              </td>
            </tr>
          </tbody>
        </table>
        <div className={cx('admin__detail--wrap')}>
          <Button
            className={cx('admin__detail--wrap--btn')}
            onClick={updateNutrient}
          >
            수정하기
          </Button>
          <Button
            to={'/admin/nutrients'}
            className={cx('admin__detail--wrap--btn')}
          >
            뒤로가기
          </Button>
        </div>
      </article>
    )
  );
};

export default withRouter(NutrientsDetail);
