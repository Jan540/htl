package docker

import (
	"context"
	"fmt"
	"math/rand"
	"os"
	"strconv"

	"github.com/docker/docker/api/types"
	"github.com/docker/docker/api/types/container"
	"github.com/docker/docker/client"
	"github.com/docker/go-connections/nat"
)

var cli *client.Client

func init() {
	var err error
	cli, err = client.NewClientWithOpts(client.FromEnv)

	if err != nil {
		panic(err)
	}
}

func ListContainer() []types.Container {
	containers, err := cli.ContainerList(context.Background(), types.ContainerListOptions{
		All: true,
	})

	if err != nil {
		panic(err)
	}

	return containers
}

func SpawnContainer(image, name string) (string, error) {
	containerID := ""

	cont, err := cli.ContainerInspect(context.Background(), name)

	if err != nil && !client.IsErrNotFound(err) {
		return "", err
	}

	if client.IsErrNotFound(err) {
		portNr := rand.Intn(20000) + 10000
		port := strconv.Itoa(portNr)

		hostname := os.Getenv("HOST_ADDRESS")

		newContainer, err := cli.ContainerCreate(context.Background(), &container.Config{
			Image: image,
			Env: []string{
				fmt.Sprint("API_PORT=", port),
				fmt.Sprint("API_HOSTNAME=", hostname),
			},
		}, &container.HostConfig{
			PortBindings: nat.PortMap{
				"6969/tcp": []nat.PortBinding{
					{
						HostIP:   "0.0.0.0",
						HostPort: port,
					},
				},
			},
		}, nil, nil, name)

		if err != nil {
			return "", err
		}

		containerID = newContainer.ID
	} else {
		containerID = cont.ID
	}

	err = cli.ContainerStart(context.Background(), containerID, types.ContainerStartOptions{})

	if err != nil {
		return "", err
	}

	// need to reinspect the container to get the port
	cont, err = cli.ContainerInspect(context.Background(), containerID)

	if err != nil {
		return "", err
	}

	return cont.NetworkSettings.Ports["6969/tcp"][0].HostPort, nil
}

func StopContainer(id string) bool {
	if !isContainerRunning(id) {
		return true
	}

	stopErr := cli.ContainerStop(context.Background(), id, container.StopOptions{})

	return stopErr == nil
}

func isContainerRunning(id string) bool {
	inspectedConatiner, inspectErr := cli.ContainerInspect(context.Background(), id)
	if inspectErr != nil {
		return false
	}

	return inspectedConatiner.State.Running

}
