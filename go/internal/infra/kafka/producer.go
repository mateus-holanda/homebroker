package kafka

import ckafka "github.com/confluentinc/confluent-kafka-go/kafka"

type Producer struct {
	ConfigMap *ckafka.ConfigMap
}

func NewProducer(configMap *ckafka.ConfigMap) *Producer {
	return &Producer{ConfigMap: configMap}
}

func (p *Producer) Publish(msg interface{}, key []byte, topic string) error {
	producer, err := ckafka.NewProducer(p.ConfigMap)

	if err != nil {
		return err
	}

	message := &ckafka.Message{
		Value: msg.([]byte),
		Key:   key,
		TopicPartition: ckafka.TopicPartition{
			Topic:     &topic,
			Partition: ckafka.PartitionAny,
		},
	}

	err = producer.Produce(message, nil)

	if err != nil {
		return err
	}

	return nil
}
