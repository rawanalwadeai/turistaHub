import React, { useState, useEffect } from 'react';
import CommonSection from '../shared/CommonSection.js';
import '../styles/tour.css';
import BoatCard from '../shared/BoatCard.js';            // كارت القارب
import BoatFilter from '../componenets/BoatFilter.js';
import { Container, Row, Col } from 'reactstrap';

import useFetchA from '../hooks/useFetchA.js';
import { BASE_URL } from '../utils/configB.js';


import { useTranslation } from 'react-i18next';
const Boat = () => {
  const [pageCount, setPageCount] = useState(0);
  const [page, setPage]         = useState(0);
  const [showFilterPanel, setShowFilterPanel] = useState(false);
  const [filteredBoats, setFilteredBoats]     = useState([]);


  const {t} = useTranslation()
  // جلب بيانات القوارب والعدد الكلي
  const { data: boats, loading, error }       = useFetchA(`${BASE_URL}/boats?page=${page}`);
  const { data: boatCount }                   = useFetchA(`${BASE_URL}/boats/count`);

  // ضبط الباجينيشن
  useEffect(() => {
    if (boatCount != null) {
      const pages = Math.ceil(boatCount / 8);  // 8 قوارب في كل صفحة
      setPageCount(pages);
    }
  }, [boatCount]);

  // عند وصول بيانات أول مرة، نعرضها بدون فلتر
  useEffect(() => {
    if (boats) setFilteredBoats(boats);
  }, [boats]);

  // دالة التصفية
  const handleFilter = (filters) => {
    if (Object.values(filters).every(v => v === '' || (Array.isArray(v) && v.length === 0))) {
      return setFilteredBoats(boats);
    }
    const result = boats.filter(b => {
      return (
        (!filters.location || b.location.includes(filters.location)) &&
        (!filters.maxPassengers || b.max_passengers >= filters.maxPassengers) &&
        (!filters.pricePerHour || b.price_per_hour <= filters.pricePerHour) &&
        (!filters.rating || b.rating >= filters.rating) &&
        (filters.features.length === 0 || 
          filters.features.every(f => b.features[f] === true)
        )
      );
    });
    setFilteredBoats(result);
  };

  return (
    <>
      <CommonSection title={t('boat_rentals')} />


      <section>
        <Container>
          {/* زر إظهار/إخفاء الفلتر */}
          <Row className="mb-3">
            <Col lg="12" className="text-end">
              <button
                className="btn primary__btn"
                onClick={() => setShowFilterPanel(!showFilterPanel)}
              >
                {showFilterPanel
                  ? t('close_filter')
                  : <i className="fa-solid fa-filter" style={{ color: 'white' }} />}
              </button>
            </Col>
          </Row>

          {/* لوحة الفلترة */}
          {showFilterPanel && (
            <Row className="mb-4">
              <Col lg="12">
                <BoatFilter onFilter={handleFilter} />
              </Col>
            </Row>
          )}

          {/* الحالة أثناء التحميل أو الخطأ */}
          {loading && <h4 className="text-center pt-5">{t('loading')}</h4>}
          {error   && <h4 className="text-center pt-5">{error}</h4>}

          {/* عرض القوارب */}
          {!loading && !error && (
            <Row>
              {filteredBoats.map(boat => (
                <Col lg="3" className="mb-4" key={boat._id}>
                  <BoatCard boats={boat} />
                </Col>
              ))}

              {/* الباجينيشن */}
              <Col lg="12">
                <div className="pagination d-flex align-items-center justify-content-center mt-4 gap-3">
                  {[...Array(pageCount).keys()].map(num => (
                    <span
                      key={num}
                      onClick={() => setPage(num)}
                      className={page === num ? 'active__page' : ''}
                    >
                      {num + 1}
                    </span>
                  ))}
                </div>
              </Col>
            </Row>
          )}
        </Container>
      </section>
    </>
  );
};

export default Boat;
