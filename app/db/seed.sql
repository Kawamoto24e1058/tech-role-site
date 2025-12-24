-- Seed data for testing
INSERT INTO results (student_id, name, scores, result, created_at) VALUES
('20201234', '山田 太郎', '{"commander":3,"worker":5,"liaison":2,"analyst":4,"support":1,"creator":0}', '[{"role":"worker","score":5,"pct":31},{"role":"analyst","score":4,"pct":25}]', now());

-- Answers can be inserted like this (if created)
-- INSERT INTO answers (result_id, question_id, choice_index, choice_text, scores) VALUES ('<result-uuid>', 1, 1, '手を動かして実行する', '{"worker":2}');
